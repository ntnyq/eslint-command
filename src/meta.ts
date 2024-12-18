// This file is generated by `vscode-ext-gen`. Do not modify manually.
// @see https://github.com/antfu/vscode-ext-gen

// Meta info
export const publisher = "ntnyq"
export const name = "eslint-command"
export const version = "0.0.3"
export const displayName = "ESLint Command"
export const description = "VSCode support for eslint-plugin-command"
export const extensionId = `${publisher}.${name}`

/**
 * Type union of all commands
 */
export type CommandKey = 
  | "eslint-command.insert-command"

/**
 * Commands map registed by `ntnyq.eslint-command`
 */
export const commands = {
  /**
   * Insert Command
   * @value `eslint-command.insert-command`
   */
  insertCommand: "eslint-command.insert-command",
} satisfies Record<string, CommandKey>

/**
 * Type union of all configs
 */
export type ConfigKey = 
  | "eslint-command.annotationColor"
  | "eslint-command.enable"
  | "eslint-command.languages"

export interface ConfigKeyTypeMap {
  "eslint-command.annotationColor": string,
  "eslint-command.enable": boolean,
  "eslint-command.languages": string[],
}

export interface ConfigShorthandMap {
  annotationColor: "eslint-command.annotationColor",
  enable: "eslint-command.enable",
  languages: "eslint-command.languages",
}

export interface ConfigItem<T extends keyof ConfigKeyTypeMap> {
  key: T,
  default: ConfigKeyTypeMap[T],
}


/**
 * Configs map registered by `ntnyq.eslint-command`
 */
export const configs = {
  /**
   * Color of annotation
   * @key `eslint-command.annotationColor`
   * @default `"rgb(255, 189, 42)"`
   * @type `string`
   */
  annotationColor: {
    key: "eslint-command.annotationColor",
    default: "rgb(255, 189, 42)",
  } as ConfigItem<"eslint-command.annotationColor">,
  /**
   * Enable extension
   * @key `eslint-command.enable`
   * @default `true`
   * @type `boolean`
   */
  enable: {
    key: "eslint-command.enable",
    default: true,
  } as ConfigItem<"eslint-command.enable">,
  /**
   * Languages to enable command decorations
   * @key `eslint-command.languages`
   * @default `["javascript","javascriptreact","typescript","typescriptreact"]`
   * @type `array`
   */
  languages: {
    key: "eslint-command.languages",
    default: ["javascript","javascriptreact","typescript","typescriptreact"],
  } as ConfigItem<"eslint-command.languages">,
}

export interface ScopedConfigKeyTypeMap {
  "annotationColor": string,
  "enable": boolean,
  "languages": string[],
}

export const scopedConfigs = {
  scope: "eslint-command",
  defaults: {
    "annotationColor": "rgb(255, 189, 42)",
    "enable": true,
    "languages": ["javascript","javascriptreact","typescript","typescriptreact"],
  } satisfies ScopedConfigKeyTypeMap,
}

export interface NestedConfigs {
  "eslint-command": {
    "annotationColor": string,
    "enable": boolean,
    "languages": string[],
  },
}

export interface NestedScopedConfigs {
  "annotationColor": string,
  "enable": boolean,
  "languages": string[],
}

