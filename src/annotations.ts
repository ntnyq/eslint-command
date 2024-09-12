import {
  computed,
  shallowRef,
  useActiveEditorDecorations,
  useActiveTextEditor,
  useDocumentText,
  watchEffect,
} from 'reactive-vscode'
import { DecorationRangeBehavior, Range, window } from 'vscode'
import { builtInCommands } from './constants'
import { getCommandMarkdown } from './markdown'
import { logger } from './utils'
import type { DecorationMatch } from './types'

export function useAnnotations() {
  const BuiltInDecoration = window.createTextEditorDecorationType({
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
    color: '#fff',
    backgroundColor: 'rgba(255, 189, 42, 0.9)',
    overviewRulerColor: 'rgba(255, 189, 42, 0.8)',
  })
  const editor = useActiveTextEditor()
  const text = useDocumentText(() => editor.value?.document)
  const languageId = computed(() => editor.value?.document.languageId)

  const decorations = shallowRef<DecorationMatch[]>([])

  useActiveEditorDecorations(BuiltInDecoration, decorations)

  // Calculate decorations
  watchEffect(() => {
    if (!editor.value || !languageId.value) {
      decorations.value = []
      return
    }

    if (
      !['javascript', 'typescript', 'javascriptreact', 'typescriptreact'].includes(languageId.value)
    ) {
      decorations.value = []
      logger.warn(`❗️ Language ${languageId.value} is not supported`)
      return
    }

    const keys: [Range, string][] = []

    builtInCommands.forEach(command => {
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
        // renderOptions: {},
        hoverMessage: getCommandMarkdown(command),
      }

      return item
    })
  })
}
