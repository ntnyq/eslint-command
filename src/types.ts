import type { DecorationOptions } from 'vscode'

export interface DecorationMatch extends DecorationOptions {
  command: string
}

export interface ESLintCommand {
  name: string

  triggers: string[]

  /**
   * @default `line`
   */
  commentType?: 'block' | 'both' | 'line'

  description?: string
}
