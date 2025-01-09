// This file is generated by `vscode-ext-gen`. Do not modify manually.
// @see https://github.com/antfu/vscode-ext-gen

// Meta info
export const publisher = "ntnyq"
export const name = "eslint-command"
export const version = "0.0.6"
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
  | "eslint-command.annotation"
  | "eslint-command.commands"
  | "eslint-command.completion"
  | "eslint-command.enable"
  | "eslint-command.languages"

export interface ConfigKeyTypeMap {
  "eslint-command.annotation": { 'before': { 'contentText': string; 'margin': string }; 'color': string; 'cursor': string },
  "eslint-command.commands": { 'commentType': ("block" | "both" | "line"); 'description': string; 'name': string; 'triggers': string[]; 'url': string }[],
  "eslint-command.completion": boolean,
  "eslint-command.enable": boolean,
  "eslint-command.languages": string[],
}

export interface ConfigShorthandMap {
  annotation: "eslint-command.annotation",
  commands: "eslint-command.commands",
  completion: "eslint-command.completion",
  enable: "eslint-command.enable",
  languages: "eslint-command.languages",
}

export interface ConfigShorthandTypeMap {
  annotation: { 'before': { 'contentText': string; 'margin': string }; 'color': string; 'cursor': string },
  commands: { 'commentType': ("block" | "both" | "line"); 'description': string; 'name': string; 'triggers': string[]; 'url': string }[],
  completion: boolean,
  enable: boolean,
  languages: string[],
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
   * ESLint command annotation
   * @key `eslint-command.annotation`
   * @default `{ "before": { "contentText": "🚀", "margin": "0 0.5em 0 0" }, "color": "rgb(255, 189, 42)", "cursor": "pointer" }`
   * @type `object`
   */
  annotation: {
    key: "eslint-command.annotation",
    default: { "before": { "contentText": "🚀", "margin": "0 0.5em 0 0" }, "color": "rgb(255, 189, 42)", "cursor": "pointer" },
  } as ConfigItem<"eslint-command.annotation">,
  /**
   * User custom commands
   * @key `eslint-command.commands`
   * @default `[]`
   * @type `array`
   */
  commands: {
    key: "eslint-command.commands",
    default: [],
  } as ConfigItem<"eslint-command.commands">,
  /**
   * Enable completion
   * @key `eslint-command.completion`
   * @default `true`
   * @type `boolean`
   */
  completion: {
    key: "eslint-command.completion",
    default: true,
  } as ConfigItem<"eslint-command.completion">,
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
   * @default `["javascript","javascriptreact","markdown","typescript","typescriptreact"]`
   * @type `array`
   */
  languages: {
    key: "eslint-command.languages",
    default: ["javascript","javascriptreact","markdown","typescript","typescriptreact"],
  } as ConfigItem<"eslint-command.languages">,
}

export interface ScopedConfigKeyTypeMap {
  "annotation": { 'before': { 'contentText': string; 'margin': string }; 'color': string; 'cursor': string },
  "commands": { 'commentType': ("block" | "both" | "line"); 'description': string; 'name': string; 'triggers': string[]; 'url': string }[],
  "completion": boolean,
  "enable": boolean,
  "languages": string[],
}

export const scopedConfigs = {
  scope: "eslint-command",
  defaults: {
    "annotation": { "before": { "contentText": "🚀", "margin": "0 0.5em 0 0" }, "color": "rgb(255, 189, 42)", "cursor": "pointer" },
    "commands": [],
    "completion": true,
    "enable": true,
    "languages": ["javascript","javascriptreact","markdown","typescript","typescriptreact"],
  } satisfies ScopedConfigKeyTypeMap,
}

export interface NestedConfigs {
  "eslint-command": {
    "annotation": { 'before': { 'contentText': string; 'margin': string }; 'color': string; 'cursor': string },
    "commands": { 'commentType': ("block" | "both" | "line"); 'description': string; 'name': string; 'triggers': string[]; 'url': string }[],
    "completion": boolean,
    "enable": boolean,
    "languages": string[],
  },
}

export interface NestedScopedConfigs {
  "annotation": { 'before': { 'contentText': string; 'margin': string }; 'color': string; 'cursor': string },
  "commands": { 'commentType': ("block" | "both" | "line"); 'description': string; 'name': string; 'triggers': string[]; 'url': string }[],
  "completion": boolean,
  "enable": boolean,
  "languages": string[],
}

