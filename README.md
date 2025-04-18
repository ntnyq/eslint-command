# eslint-command

[![CI](https://github.com/ntnyq/eslint-command/workflows/CI/badge.svg)](https://github.com/ntnyq/eslint-command/actions)
[![Version](https://img.shields.io/github/v/release/ntnyq/eslint-command?include_prereleases&label=Visual%20Studio%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=ntnyq.eslint-command)
[![License](https://img.shields.io/github/license/ntnyq/eslint-command)](https://github.com/ntnyq/eslint-command/blob/main/LICENSE)

> VSCode support for eslint-plugin-command.

## Features

- Insert ESLint command via VSCode command
- Add annotations for ESLint command
- Complete ESLint command, triggers:
  - `/// `
  - `// @`

## Commands

<!-- commands -->

| Command                         | Title                          |
| ------------------------------- | ------------------------------ |
| `eslint-command.insert-command` | ESLint Command: Insert Command |

<!-- commands -->

## Configs

<!-- configs -->

| Key                         | Description                             | Type      | Default                                                                                                             |
| --------------------------- | --------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| `eslint-command.annotation` | ESLint command annotation               | `object`  | `{ "before": { "contentText": "🚀", "margin": "0 0.5em 0 0" }, "color": "rgb(255, 189, 42)", "cursor": "pointer" }` |
| `eslint-command.commands`   | User custom commands                    | `array`   | `[]`                                                                                                                |
| `eslint-command.completion` | Enable completion                       | `boolean` | `true`                                                                                                              |
| `eslint-command.enable`     | Enable extension                        | `boolean` | `true`                                                                                                              |
| `eslint-command.languages`  | Languages to enable command decorations | `array`   | `["javascript","javascriptreact","markdown","typescript","typescriptreact"]`                                        |

<!-- configs -->

## Links

- [antfu/eslint-plugin-command](https://github.com/antfu/eslint-plugin-command)

## License

[MIT](./LICENSE) License © 2024-PRESENT [ntnyq](https://github.com/ntnyq)
