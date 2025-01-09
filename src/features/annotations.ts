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
import { config, getLanguageIds } from '../config'
import { getCommandMarkdown, logger } from '../utils'
import type { DecorationMatch } from '../types'

/**
 * Manages text editor decorations for ESLint commands in a Visual Studio Code extension.
 *
 * @remarks
 * This asynchronous function creates decorations for ESLint commands in the active text editor.
 * It supports dynamic language detection and provides visual annotations for command triggers.
 *
 * @description
 * The function performs the following key operations:
 * - Creates a custom text decoration with a rocket (🚀) icon
 * - Retrieves the active text editor and document
 * - Filters decorations based on supported programming languages
 * - Identifies ESLint command triggers in the document
 * - Generates hover messages for detected commands
 *
 * @returns {void}
 *
 * @throws {Error} If there are issues retrieving the active editor or document
 *
 * @beta
 */
export async function useAnnotations() {
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

  const { eslintCommands } = useESLintCommands()

  const decorations = shallowRef<DecorationMatch[]>([])

  const supportedLanguages = await getLanguageIds()

  useActiveEditorDecorations(BuiltInDecoration, decorations)

  // Calculate decorations
  watchEffect(() => {
    if (!editor.value || !text.value || !languageId.value) {
      decorations.value = []
      return
    }

    if (!supportedLanguages.includes(languageId.value)) {
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
