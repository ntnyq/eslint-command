import type { ESLintCommand } from '../types'

export const builtInCommands: ESLintCommand[] = [
  {
    description: 'Hoist regular expressions to the top-level.',
    name: 'hoist-regexp',
    triggers: ['/// hoist-regexp', '/// hoist-regex', '/// hreg'],
  },
  {
    description: 'Inline return statement of arrow function.',
    name: 'inline-arrow',
    triggers: ['/// inline-arrow', '/// ia'],
  },
  {
    name: 'keep-aligned',
    triggers: ['/// keep-aligned', '// @keep-aligned'],
    description:
      'Keep specific symbols within a block of code are aligned vertically.',
  },
  {
    description: 'Keep the object keys or array items sorted.',
    name: 'keep-sorted',
    triggers: ['/// keep-sorted', '// @keep-sorted'],
  },
  {
    description: 'Keep array items unique, removing duplicates.',
    name: 'keep-unique',
    triggers: ['/// keep-unique', '/// uniq', '// @keep-unique'],
  },
  {
    description: 'Expand object shorthand properties to their full form.',
    name: 'no-shorthand',
    triggers: ['/// no-shorthand', '/// nsh'],
  },
  {
    description: 'Removes TypeScript type annotations.',
    name: 'no-type',
    triggers: ['/// no-type', '/// nt'],
  },
  {
    name: 'regex101',
    description:
      'Generate up-to-date [regex101](https://regex101.com) links for your RegExp patterns in jsdoc comments. Helps you test and inspect the RegExp easily.',
    triggers: [
      '// @regex101',
      /**
       * TODO: support block comments
       */
      '/* @regex101 */',
    ],
  },
  {
    name: 'to-arrow',
    triggers: ['/// to-arrow', '/// 2a'],
    description:
      'Convert a standard function declaration to an arrow function.',
  },
  {
    name: 'to-destructuring',
    description:
      'Convert an assignment expression to destructuring assignment.',
    triggers: [
      '/// to-destructuring',
      '/// to-dest',
      '/// 2destructuring',
      '/// 2dest',
    ],
  },
  {
    description: 'Convert import statement to dynamic import.',
    name: 'to-dynamic-import',
    triggers: ['/// to-dynamic-import', '/// to-dynamic'],
  },
  {
    description: 'Convert for-of/for-in loop to `.forEach()`.',
    name: 'to-for-each',
    triggers: ['/// to-for-each', '/// foreach'],
  },
  {
    description: 'Convert `.forEach()` to for-of loop.',
    name: 'to-for-of',
    triggers: ['/// to-for-of', '/// forof'],
  },
  {
    name: 'to-function',
    triggers: ['/// to-function', '/// to-fn', '/// 2f'],
    description:
      'Convert an arrow function to a standard function declaration.',
  },
  {
    name: 'to-promise-all',
    triggers: ['/// to-promise-all', '/// 2pa'],
    description:
      'Convert multiple `await` statements to `await Promise.all()`.',
  },
  {
    description: 'Convert template literals to string literals.',
    name: 'to-string-literal',
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
    description: 'Convert string literals to template literals.',
    name: 'to-template-literal',
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
    triggers: ['/// to-ternary', '/// to-3', '/// 2ternary', '/// 23'],
    description:
      'Convert an `if-else` statement to a [ternary expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator).',
  },
  {
    name: 'no-x-above',
    triggers: ['// @no-await-above', '// @no-await-below'],
    description:
      'Disallow certain syntaxes above or below the comment, with in the current block.',
  },
  {
    description: 'Convert multiple lines object to one line object.',
    name: 'to-one-line',
    triggers: ['/// to-one-line', '/// tol', '/// 21l'],
  },
]
