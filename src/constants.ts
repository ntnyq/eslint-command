import type { ESLintCommand } from './types'

export const createDocsUrl = (ruleName: string) =>
  `https://eslint-plugin-command.antfu.me/commands/${ruleName}`

export const builtInCommands: ESLintCommand[] = [
  {
    name: 'hoist-regexp',
    description: 'Hoist regular expressions to the top-level.',
    triggers: ['/// hoist-regexp', '/// hoist-regex', '/// hreg'],
  },
  {
    name: 'inline-arrow',
    description: 'Inline return statement of arrow function.',
    triggers: ['/// inline-arrow', '/// ia'],
  },
  {
    name: 'keep-sorted',
    description: 'Keep the object keys or array items sorted.',
    triggers: ['/// keep-sorted', '// @keep-sorted'],
  },
  {
    name: 'keep-unique',
    description: 'Keep array items unique, removing duplicates.',
    triggers: ['/// keep-unique', '/// uniq', '// @keep-unique'],
  },
  {
    name: 'no-shorthand',
    description: 'Expand object shorthand properties to their full form.',
    triggers: ['/// no-shorthand', '/// nsh'],
  },
  {
    name: 'no-type',
    description: 'Removes TypeScript type annotations.',
    triggers: ['/// no-type', '/// nt'],
  },
  {
    name: 'regex101',
    description:
      'Generate up-to-date [regex101](https://regex101.com) links for your RegExp patterns in jsdoc comments. Helps you test and inspect the RegExp easily.',
    triggers: ['// @regex101', '/* @regex101 */'],
  },
  {
    name: 'to-arrow',
    description: 'Convert a standard function declaration to an arrow function.',
    triggers: ['/// to-arrow', '/// 2a'],
  },
  {
    name: 'to-destructuring',
    description: 'Convert an assignment expression to destructuring assignment.',
    triggers: ['/// to-destructuring', '/// to-dest', '/// 2destructuring', '/// 2dest'],
  },
  {
    name: 'to-dynamic-import',
    description: 'Convert import statement to dynamic import.',
    triggers: ['/// to-dynamic-import', '/// to-dynamic'],
  },
  {
    name: 'to-for-each',
    description: 'Convert for-of/for-in loop to `.forEach()`.',
    triggers: ['/// to-for-each', '/// foreach'],
  },
  {
    name: 'to-for-of',
    description: 'Convert `.forEach()` to for-of loop.',
    triggers: ['/// to-for-of', '/// forof'],
  },
  {
    name: 'to-function',
    description: 'Convert an arrow function to a standard function declaration.',
    triggers: ['/// to-function', '/// to-fn', '/// 2f'],
  },
  {
    name: 'to-promise-all',
    description: 'Convert multiple `await` statements to `await Promise.all()`.',
    triggers: ['/// to-promise-all', '/// 2pa'],
  },
  {
    name: 'to-string-literal',
    description: 'Convert template literals to string literals.',
    triggers: [
      '/// to-string-literal',
      '/// to-sl',
      '/// 2string-literal',
      '/// 2sl',
      '// @to-string-literal',
      '// @to-sl',
      '// @2string-literal',
      '// @2sl',
    ],
  },
  {
    name: 'to-template-literal',
    description: 'Convert string literals to template literals.',
    triggers: [
      '/// to-template-literal',
      '/// to-tl',
      '/// 2template-literal',
      '/// 2tl',
      '// @to-template-literal',
      '// @to-tl',
      '// @2template-literal',
      '// @2tl',
    ],
  },
  {
    name: 'to-ternary',
    description:
      'Convert an `if-else` statement to a [ternary expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator).',
    triggers: ['/// to-ternary', '/// to-3', '/// 2ternary', '/// 23'],
  },
]

export const RE_LINE_COMMENT = /\/\/.*/
export const RE_BLOCK_COMMENT = /\/\*[\s\S]*?\*\//g
