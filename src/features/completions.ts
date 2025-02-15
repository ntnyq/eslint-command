import { extensionContext } from 'reactive-vscode'
import {
  CompletionItem,
  CompletionItemKind,
  CompletionList,
  languages,
  MarkdownString,
} from 'vscode'
import { useESLintCommands } from '../composables/commands'
import { config, getLanguageIds } from '../config'
import { createDocsUrl, logger } from '../utils'
import type {
  CancellationToken,
  CompletionContext,
  CompletionItemProvider,
  Position,
  TextDocument,
} from 'vscode'
import type { ESLintCommand } from '../types'

enum CommandTrigger {
  SPACE = ' ',
  AT = '@',
}

class ESLintCommandCompletionItem extends CompletionItem {
  eslintCommand: ESLintCommand

  constructor(
    label: string,
    kind: CompletionItemKind,
    eslintCommand: ESLintCommand,
  ) {
    super(label, kind)
    this.eslintCommand = eslintCommand
  }
}

function getMarkdown(eslintCommand: ESLintCommand) {
  return new MarkdownString(
    `#### [${eslintCommand.name}](${eslintCommand.url || createDocsUrl(eslintCommand.name)})\n\n${eslintCommand.description}`,
  )
}

function getCompletionList({
  replaced,
  lineText,
}: {
  replaced: string
  lineText: string
}) {
  const { eslintCommands } = useESLintCommands()

  const completionList: ESLintCommandCompletionItem[] = []

  eslintCommands.value.forEach(eslintCommand => {
    eslintCommand.triggers.forEach(trigger => {
      if (trigger.startsWith(lineText)) {
        const completionItem = new ESLintCommandCompletionItem(
          trigger,
          CompletionItemKind.Text,
          eslintCommand,
        )

        completionItem.documentation = getMarkdown(eslintCommand)
        completionItem.insertText = trigger.replace(`${replaced}`, '')

        completionList.push(completionItem)
      }
    })
  })

  return new CompletionList(completionList)
}

const provider: CompletionItemProvider<ESLintCommandCompletionItem> = {
  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext,
  ) {
    if (!config.completion) {
      logger.info('Completion is disabled')
      return
    }

    const line = document.lineAt(position)
    const lineText = line.text.slice(0, Math.max(0, position.character))

    if (
      lineText.startsWith('///')
      && context.triggerCharacter === CommandTrigger.SPACE
    ) {
      return getCompletionList({
        replaced: `///${CommandTrigger.SPACE}`,
        lineText,
      })
    }

    if (
      lineText.startsWith('// @')
      && context.triggerCharacter === CommandTrigger.AT
    ) {
      return getCompletionList({
        replaced: `// ${CommandTrigger.AT}`,
        lineText,
      })
    }
  },
}

export async function useCompletions() {
  const ctx = extensionContext.value!

  ctx.subscriptions.push(
    languages.registerCompletionItemProvider(
      await getLanguageIds(),
      provider,
      CommandTrigger.SPACE,
      CommandTrigger.AT,
    ),
  )
}
