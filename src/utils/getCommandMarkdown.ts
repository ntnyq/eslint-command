import { MarkdownString } from 'vscode'
import { useESLintCommands } from '../composables/commands'
import { createDocsUrl } from './createDocUrl'

export function getCommandMarkdown(name: string) {
  const { eslintCommands } = useESLintCommands()

  const command = eslintCommands.value.find(c => c.name === name)

  if (!command) {
    return
  }

  return new MarkdownString(
    `#### [eslint-plugin-command](https://eslint-plugin-command.antfu.me)\n\n[${name}](${command.url || createDocsUrl(name)})\n\n${command.description}`,
  )
}
