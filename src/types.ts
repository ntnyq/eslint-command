import type { DecorationOptions } from 'vscode'

export interface DecorationMatch extends DecorationOptions {
  command: string
}

export interface ESLintCommand {
  /**
   * Command description
   */
  description: string

  /**
   * Command name
   */
  name: string

  /**
   * Command triggers
   */
  triggers: string[]

  /**
   * @default `line`
   */
  commentType?: 'block' | 'both' | 'line'

  /**
   * Command docs url
   */
  url?: string
}
