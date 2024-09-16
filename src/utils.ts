import { useLogger } from 'reactive-vscode'
import { displayName } from './meta'

/**
 * Logger
 */
export const logger = useLogger(displayName)

/**
 * Escape RegExp
 */
export function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
