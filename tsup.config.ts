import process from 'node:process'
import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: false,
  entry: ['src/index.ts'],
  external: ['vscode'],
  format: ['cjs'],
  noExternal: ['reactive-vscode'],
  sourcemap: process.env.NODE_ENV === 'development',
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production',
  },
})
