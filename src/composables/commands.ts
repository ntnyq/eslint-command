import { computed } from 'reactive-vscode'
import { config } from '../config'
import { builtInCommands } from '../constants'

export function useESLintCommands() {
  const eslintCommands = computed(() => [
    // eslint-plugin-command
    ...builtInCommands,

    // user customized
    ...config.commands,
  ])

  return {
    eslintCommands,
  }
}
