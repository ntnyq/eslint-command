import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { logger } from './utils'
import { useAnnotations } from './annotations'

const { activate, deactivate } = defineExtension(async () => {
  logger.info(`✅ Activated, v${version}`)

  useAnnotations()
})

export { activate, deactivate }
