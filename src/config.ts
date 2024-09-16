import { computed, defineConfigObject, useIsDarkTheme } from 'reactive-vscode'
import { scopedConfigs } from './meta'
import type { ScopedConfigKeyTypeMap } from './meta'

export const config = defineConfigObject<ScopedConfigKeyTypeMap>(
  scopedConfigs.scope,
  scopedConfigs.defaults,
)

const isDark = useIsDarkTheme()
export const color = computed(() => (isDark.value ? '#000' : '#fff'))
