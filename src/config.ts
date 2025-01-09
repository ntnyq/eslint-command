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
 * Validates an array of language identifiers against a list of all available languages.
 *
 * @param targets - An array of language identifiers to validate
 * @param allLanguages - An array of all available language identifiers
 * @returns An array of valid language identifiers
 *
 * @remarks
 * This function filters out languages that are not present in the `allLanguages` array.
 * If any invalid languages are found, a warning message is displayed in the VS Code window.
 *
 * @example
 * ```typescript
 * const validLangs = await validateLanguages(['typescript', 'python'], ['typescript', 'javascript', 'python'])
 * // Returns: ['typescript', 'python']
 * // Shows warning for any invalid languages
 * ```
 */
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
    window.showWarningMessage(`Invalid language(s): ${invalidLanguages.join(', ')}`)
  }

  return validateLanguages
}

/**
 * Retrieves a unique list of valid language identifiers.
 *
 * @remarks
 * This function combines default language IDs with configured languages,
 * ensuring only valid and supported languages are returned.
 *
 * @returns An array of unique, valid language identifiers
 *
 * @async
 */
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
