import type { DecorationOptions } from 'vscode'

export interface DecorationMatch extends DecorationOptions {
  command: string
}

export interface ESLintCommand {
  name: string

  /**
   * @default `line`
   */
  commentType?: 'line' | 'block' | 'both'

  description?: string

  triggers: string[]
}
