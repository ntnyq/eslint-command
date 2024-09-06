import { computed, defineConfigObject, useIsDarkTheme } from 'reactive-vscode'
import * as Meta from './meta'

export const config = defineConfigObject<Meta.ScopedConfigKeyTypeMap>(
  Meta.scopedConfigs.scope,
  Meta.scopedConfigs.defaults,
)

const isDark = useIsDarkTheme()
export const color = computed(() => (isDark.value ? '#000' : '#fff'))
