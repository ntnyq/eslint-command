import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { config } from './config'
import { useAnnotations } from './features/annotations'
import { useCommands } from './features/commands'
import { useCompletions } from './features/completions'
import { logger } from './utils'

const { activate, deactivate } = defineExtension(async () => {
  logger.info(`✅ Activated, v${version}`)

  if (!config.enable) {
    return logger.warn('❌ Disabled by configuration')
  }

  useCommands()

  useCompletions()
  useAnnotations()
})

export { activate, deactivate }
