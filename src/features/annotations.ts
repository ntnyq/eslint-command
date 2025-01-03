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
import { config } from '../config'
import { getCommandMarkdown, logger } from '../utils'
import type { DecorationMatch } from '../types'

export function useAnnotations() {
  const BuiltInDecoration = window.createTextEditorDecorationType({
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
    color: config.annotationColor,
    after: {
      contentText: '🚀',
      margin: '0 0 0 0.5em',
    },
  })
  const editor = useActiveTextEditor()
  const text = useDocumentText(() => editor.value?.document)
  const languageId = computed(() => editor.value?.document.languageId)

  const decorations = shallowRef<DecorationMatch[]>([])

  useActiveEditorDecorations(BuiltInDecoration, decorations)

  // Calculate decorations
  watchEffect(() => {
    if (!editor.value || !languageId.value || !config.enable) {
      decorations.value = []
      return
    }

    if (!config.languages.includes(languageId.value)) {
      decorations.value = []
      logger.warn(`❗️ Language ${languageId.value} is not supported`)
      return
    }

    const keys: [Range, string][] = []

    const { eslintCommands } = useESLintCommands()

    eslintCommands.value.forEach(command => {
      const regexp = new RegExp(`${command.triggers.join('|')}`, 'g')
      let match: RegExpExecArray | null = null

      regexp.lastIndex = 0

      while ((match = regexp.exec(text.value!))) {
        if (!editor.value) continue

        const startPos = editor.value.document.positionAt(match.index)
        const endPos = editor.value.document.positionAt(match.index + match[0].length)

        logger.info(`🔍 Found ${command.name} at ${startPos.line}:${startPos.character}`)

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
  })
}
