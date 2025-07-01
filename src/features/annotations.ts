import {
  computed,
  shallowRef,
  useActiveEditorDecorations,
  useActiveTextEditor,
  useDocumentText,
  watchEffect,
} from 'reactive-vscode'
import { DecorationRangeBehavior, Range, window } from 'vscode'
import { useESLintCommands } from '../composables/commands'
import { config, DEFAULT_ANNOTATION, getLanguageIds } from '../config'
import { getCommandMarkdown, logger } from '../utils'
import type { DecorationMatch } from '../types'

export async function useAnnotations() {
  const BuiltInDecoration = window.createTextEditorDecorationType({
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
    color: config.annotation?.color || DEFAULT_ANNOTATION.color,
    before: {
      contentText:
        config.annotation?.before?.contentText
        || DEFAULT_ANNOTATION.before.contentText,
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

  useActiveEditorDecorations(BuiltInDecoration, decorations)

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

    const keys: [Range, string][] = []

    eslintCommands.value.forEach(command => {
      const regexp = new RegExp(`${command.triggers.join('|')}`, 'g')
      let match: RegExpExecArray | null = null

      regexp.lastIndex = 0

      while ((match = regexp.exec(text.value!))) {
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

  // Calculate decorations
  watchEffect(() => {
    updateDecorations()
  })

  watchEffect(async () => {
    supportedLanguages.value = await getLanguageIds()
  })
}
