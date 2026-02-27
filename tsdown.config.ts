import process from 'node:process'
import { defineConfig } from 'tsdown'
import pkg from './package.json' with { type: 'json' }

const isDev = () => process.env.NODE_ENV === 'development'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  minify: !isDev(),
  platform: 'neutral',
  shims: true,
  sourcemap: isDev(),
  watch: isDev(),
  deps: {
    alwaysBundle: Object.keys(pkg.dependencies),
    neverBundle: ['vscode'],
    onlyAllowBundle: [
      'reactive-vscode',
      '@reactive-vscode/reactivity',
      'ohash',
    ],
  },
})
