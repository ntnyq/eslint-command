import { computed, useActiveTextEditor, useCommand } from 'reactive-vscode'
import { SnippetString, window } from 'vscode'
import { config } from './config'
import { builtInCommands } from './constants'
import { commands } from './meta'
import { logger } from './utils'

export function useCommands() {
  const editor = useActiveTextEditor()
  const languageId = computed(() => editor.value?.document.languageId)

  useCommand(commands.insertCommand, async () => {
    if (!languageId.value) {
      return logger.warn('No active editor')
    }
    if (!config.languages.includes(languageId.value)) {
      return logger.info('Unsupported language')
    }

    const command = await window.showQuickPick(
      builtInCommands.map(command => ({
        label: command.name,
        description: command.description,
      })),
      {
        canPickMany: false,
      },
    )

    if (!command) {
      return logger.info('No command selected')
    }

    const trigger = builtInCommands.find(c => c.name === command.label)?.triggers?.[0]

    if (!trigger) {
      return logger.warn('No trigger found')
    }

    await editor.value?.insertSnippet(new SnippetString(trigger))

    return window.showInformationMessage(`Inserted ${command.label}`)
  })
}
