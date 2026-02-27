import { hash } from 'ohash'
import {
  computed,
  ref,
  shallowRef,
  useActiveTextEditor,
  useDocumentText,
  useEditorDecorations,
  watch,
  watchEffect,
} from 'reactive-vscode'
import { DecorationRangeBehavior, Range, window } from 'vscode'
import { useESLintCommands } from '../composables/commands'
import { config, DEFAULT_ANNOTATION, getLanguageIds } from '../config'
import { escapeRegExp, getCommandMarkdown, logger } from '../utils'
import type { DecorationMatch } from '../types'

export function useAnnotations() {
  const BuiltInDecoration = window.createTextEditorDecorationType({
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
    color: config.annotation?.color || DEFAULT_ANNOTATION.color,
    before: {
      contentText:
        config.annotation?.before?.contentText ||
        DEFAULT_ANNOTATION.before.contentText,
      margin:
        config.annotation?.before?.margin || DEFAULT_ANNOTATION.before.margin,
    },
    cursor: config.annotation.cursor || DEFAULT_ANNOTATION.cursor,
  })
  const editor = useActiveTextEditor()
  const text = useDocumentText(() => editor.value?.document)
  const languageId = computed(() => editor.value?.document.languageId)

  const { eslintCommands } = useESLintCommands()

  const decorations = shallowRef<DecorationMatch[]>([])
  const supportedLanguages = shallowRef<string[]>([])

  // Cache the last text hash and language ID to avoid unnecessary updates
  const lastTextHash = ref<string>('')
  const lastLanguageId = ref<string>('')

  // Debounce timer for text content changes
  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  const DEBOUNCE_DELAY = 300 // 300ms debounce delay

  useEditorDecorations(editor, BuiltInDecoration, decorations)

  function updateDecorations() {
    if (!editor.value || !text.value || !languageId.value) {
      decorations.value = []
      return
    }

    if (!supportedLanguages.value.includes(languageId.value)) {
      decorations.value = []
      logger.warn(`❗️ Language ${languageId.value} is not supported`)
      return
    }

    // Create a robust hash to detect if an update is really needed
    const currentTextHash = hash(text.value)
    const currentLanguageId = languageId.value

    // If the text content and language haven't changed significantly, skip the update
    if (
      lastTextHash.value === currentTextHash &&
      lastLanguageId.value === currentLanguageId
    ) {
      return
    }

    lastTextHash.value = currentTextHash
    lastLanguageId.value = currentLanguageId

    const keys: [Range, string][] = []

    eslintCommands.value.forEach(command => {
      const regexp = new RegExp(
        `${command.triggers.map(escapeRegExp).join('|')}`,
        'g',
      )
      let match: RegExpExecArray | null = null

      regexp.lastIndex = 0

      if (!text.value) {
        return
      }

      while ((match = regexp.exec(text.value))) {
        if (!editor.value) {
          continue
        }

        const startPos = editor.value.document.positionAt(match.index)
        const endPos = editor.value.document.positionAt(
          match.index + match[0].length,
        )

        logger.info(
          `🔍 Found ${command.name} at ${startPos.line}:${startPos.character}`,
        )

        keys.push([new Range(startPos, endPos), command.name])
      }
    })

    decorations.value = keys.map(([range, command]) => {
      const item: DecorationMatch = {
        command,
        range,
        hoverMessage: getCommandMarkdown(command),
      }

      return item
    })
  }

  function debouncedUpdateDecorations() {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
      updateDecorations()
      debounceTimer = null
    }, DEBOUNCE_DELAY)
  }

  // Use separate watchers for different dependencies to provide more precise control
  watch(
    [editor, supportedLanguages, eslintCommands],
    () => {
      // Immediately update when editor, supported languages, or ESLint commands change
      updateDecorations()
    },
    { immediate: true },
  )

  watch([text, languageId], () => {
    // Use debounced update when text content or language ID changes
    debouncedUpdateDecorations()
  })

  watchEffect(async () => {
    supportedLanguages.value = await getLanguageIds()
  })
}
