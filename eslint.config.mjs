import { ntnyq } from '@ntnyq/eslint-config'

export default ntnyq({
  ignores: ['**/src/meta.ts'],
  unicorn: {
    overrides: {
      'unicorn/better-regex': 'off',
    },
  },
})
