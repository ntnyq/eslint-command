import { useLogger } from 'reactive-vscode'
import * as Meta from './meta'

/**
 * Logger
 */
export const logger = useLogger(Meta.displayName)

/**
 * Escape RegExp
 */
export function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
