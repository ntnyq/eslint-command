import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { useAnnotations } from './annotations'
import { useCommands } from './commands'
import { useCompletions } from './completions'
import { logger } from './utils'

const { activate, deactivate } = defineExtension(async () => {
  logger.info(`✅ Activated, v${version}`)

  useCommands()
  useCompletions()
  useAnnotations()
})

export { activate, deactivate }
