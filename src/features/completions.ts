import { extensionContext } from 'reactive-vscode'
import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  languages,
  MarkdownString,
} from 'vscode'
import { useESLintCommands } from '../composables/commands'
import { config } from '../config'
import { createDocsUrl, logger } from '../utils'
import type {
  CancellationToken,
  CompletionContext,
  CompletionItemProvider,
  DocumentSelector,
  Position,
  ProviderResult,
  TextDocument,
} from 'vscode'

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

  getCompletionList({ replaced, lineText }: { replaced: string; lineText: string }) {
    const { eslintCommands } = useESLintCommands()
    const completionList = eslintCommands.value.reduce<CompletionItem[]>(
      (list, command) => [
        ...list,
        ...command.triggers
          .filter(trigger => trigger.startsWith(lineText))
          .map(trigger => {
            const completionItem = new CompletionItem(trigger, CompletionItemKind.Text)
            completionItem.documentation = new MarkdownString(
              `#### [${command.name}](${command.url || createDocsUrl(command.name)})\n\n${command.description}`,
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
