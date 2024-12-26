import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { useAnnotations } from './features/annotations'
import { useCommands } from './features/commands'
import { useCompletions } from './features/completions'
import { logger } from './utils'

const { activate, deactivate } = defineExtension(async () => {
  logger.info(`✅ Activated, v${version}`)

  useCommands()
  useCompletions()
  useAnnotations()
})

export { activate, deactivate }
