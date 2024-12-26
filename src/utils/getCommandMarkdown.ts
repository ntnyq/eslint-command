import { MarkdownString } from 'vscode'
import { builtInCommands } from '../constants'
import { createDocsUrl } from './createDocUrl'

export function getCommandMarkdown(name: string) {
  const command = builtInCommands.find(c => c.name === name)

  if (!command) return

  return new MarkdownString(
    `#### [eslint-plugin-command](https://eslint-plugin-command.antfu.me)\n\n[${name}](${createDocsUrl(name)})\n\n${command.description ?? ''}`,
  )
}
