import { computed, useActiveTextEditor, useCommand } from 'reactive-vscode'
import { SnippetString, window } from 'vscode'
import { useESLintCommands } from '../composables/commands'
import { getLanguageIds } from '../config'
import { commands } from '../meta'
import { logger } from '../utils'

export function useCommands() {
  const editor = useActiveTextEditor()
  const languageId = computed(() => editor.value?.document.languageId)

  useCommand(commands.insertCommand, async () => {
    if (!languageId.value) {
      return logger.warn('No active editor')
    }

    const supportedLanguages = await getLanguageIds()
    if (!supportedLanguages.includes(languageId.value)) {
      return logger.info('Unsupported language')
    }

    const { eslintCommands } = useESLintCommands()

    const command = await window.showQuickPick(
      eslintCommands.value.map(c => ({
        label: c.name,
        description: c.description,
      })),
      {
        canPickMany: false,
      },
    )

    if (!command) {
      return logger.info('No command selected')
    }

    const trigger = eslintCommands.value.find(c => c.name === command.label)
      ?.triggers?.[0]

    if (!trigger) {
      return logger.warn('No trigger found')
    }

    await editor.value?.insertSnippet(new SnippetString(trigger))

    return window.showInformationMessage(`Inserted ${command.label}`)
  })
}
