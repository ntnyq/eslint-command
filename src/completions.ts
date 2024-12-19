import { extensionContext } from 'reactive-vscode'
import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  languages,
  MarkdownString,
} from 'vscode'
import { config } from './config'
import { builtInCommands, createDocsUrl } from './constants'
import { logger } from './utils'
import type {
  CancellationToken,
  CompletionContext,
  CompletionItemProvider,
  DocumentSelector,
  Position,
  ProviderResult,
  TextDocument,
} from 'vscode'
import type { ESLintCommand } from './types'

enum CommandTrigger {
  SPACE = ' ',
  AT = '@',
}

class CommandCompletionProvider implements CompletionItemProvider {
  static selector: DocumentSelector = config.languages.map(language => ({
    language,
    scheme: 'file',
  }))

  static triggers = [CommandTrigger.SPACE, CommandTrigger.AT]

  getAllCommands() {
    const allCommands: ESLintCommand[] = [
      ...builtInCommands,

      // TODO: support custom commands
    ]

    return allCommands
  }

  getCompletionList({ replaced, lineText }: { replaced: string; lineText: string }) {
    const completionList = this.getAllCommands().reduce<CompletionItem[]>(
      (list, command) => [
        ...list,
        ...command.triggers
          .filter(trigger => trigger.startsWith(lineText))
          .map(trigger => {
            const completionItem = new CompletionItem(trigger, CompletionItemKind.Text)
            completionItem.documentation = new MarkdownString(
              `#### [${command.name}](${createDocsUrl(command.name)})\n\n${command.description ?? ''}`,
            )
            completionItem.insertText = trigger.replace(`${replaced}`, '')
            return completionItem
          }),
      ],
      [],
    )
    return completionList
  }

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext,
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    if (!config.completion) {
      logger.info('Completion is disabled')
      return
    }

    const line = document.lineAt(position)
    const lineText = line.text.slice(0, Math.max(0, position.character))

    if (lineText.startsWith('///') && context.triggerCharacter === CommandTrigger.SPACE) {
      return new CompletionList(
        this.getCompletionList({
          replaced: `///${CommandTrigger.SPACE}`,
          lineText,
        }),
      )
    }

    if (lineText.startsWith('// @') && context.triggerCharacter === CommandTrigger.AT) {
      return new CompletionList(
        this.getCompletionList({
          replaced: `// ${CommandTrigger.AT}`,
          lineText,
        }),
      )
    }
  }
}

export function useCompletions() {
  const ctx = extensionContext.value!

  ctx.subscriptions.push(
    languages.registerCompletionItemProvider(
      CommandCompletionProvider.selector,
      new CommandCompletionProvider(),
      ...CommandCompletionProvider.triggers,
    ),
  )
}
