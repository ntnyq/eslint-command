import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { useAnnotations } from './annotations'
import { useCommands } from './commands'
import { logger } from './utils'

const { activate, deactivate } = defineExtension(async () => {
  logger.info(`✅ Activated, v${version}`)

  useCommands()
  useAnnotations()
})

export { activate, deactivate }
