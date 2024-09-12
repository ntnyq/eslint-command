import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { useAnnotations } from './annotations'
import { logger } from './utils'

const { activate, deactivate } = defineExtension(async () => {
  logger.info(`✅ Activated, v${version}`)

  useAnnotations()
})

export { activate, deactivate }
