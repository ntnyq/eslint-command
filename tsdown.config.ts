import process from 'node:process'
import { defineConfig } from 'tsdown'
import pkg from './package.json'

const isDev = () => process.env.NODE_ENV === 'development'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  external: ['vscode'],
  format: 'cjs',
  minify: !isDev(),
  shims: true,
  sourcemap: isDev(),
  watch: isDev(),
  noExternal: [
    // Bundle all dependencies
    ...Object.keys(pkg.dependencies || {}),
  ],
})
