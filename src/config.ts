import { defineConfigObject } from 'reactive-vscode'
import { languages, window } from 'vscode'
import { defaultLanguageIds } from './constants'
import { scopedConfigs } from './meta'
import type { ScopedConfigKeyTypeMap } from './meta'

export const config = defineConfigObject<ScopedConfigKeyTypeMap>(
  scopedConfigs.scope,
  scopedConfigs.defaults,
)

/**
 * default style for annotation
 */
export const DEFAULT_ANNOTATION = {
  color: 'rgb(255, 189, 42)',
  before: {
    contentText: '🚀',
    margin: '0 0.5em 0 0',
  },
  cursor: 'pointer',
}

async function validateLanguages(targets: string[], allLanguages: string[]) {
  const invalidLanguages: string[] = []
  const validateLanguages = targets.filter(language => {
    if (!allLanguages.includes(language)) {
      invalidLanguages.push(language)
      return false
    }
    return true
  })

  if (invalidLanguages.length) {
    window.showWarningMessage(
      `Invalid language(s): ${invalidLanguages.join(', ')}`,
    )
  }

  return validateLanguages
}

export async function getLanguageIds() {
  const allLanguages = await languages.getLanguages()
  const languageIds = config.languages || []

  return Array.from(
    new Set(
      [
        ...defaultLanguageIds,
        // only valid languages
        ...(await validateLanguages(languageIds, allLanguages)),
      ].filter(language => allLanguages.includes(language)),
    ),
  )
}
