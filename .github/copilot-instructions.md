# ESLint Command VSCode Extension - AI Agent Instructions

## Project Overview

This is a VSCode extension that provides IntelliSense and visual annotations for eslint-plugin-command. The extension detects special ESLint command comments (like `/// keep-sorted`, `// @keep-aligned`) and provides:

- Auto-completion for command triggers (`/// ` and `// @`)
- Visual annotations with emoji indicators (🚀) for active commands
- Insert command palette for easy command insertion

## Architecture & Key Components

### Reactive Architecture

- Built on **reactive-vscode** framework for reactive programming patterns
- Entry point: `src/index.ts` uses `defineExtension()` with three main features
- All features use composables pattern with reactive refs and computed values

### Core Features (src/features/)

1. **annotations.ts**: Visual decorations with debounced updates (300ms) and text hash caching
2. **commands.ts**: Command palette integration for inserting ESLint commands
3. **completions.ts**: IntelliSense provider for `/// ` and `// @` triggers

### Configuration System

- Uses `reactive-vscode`'s `defineConfigObject()` in `src/config.ts`
- Auto-generated metadata in `src/meta.ts` (via `vscode-ext-gen`)
- Language validation with user warnings for invalid language IDs

## Development Workflows

### Build & Development

```bash
pnpm dev          # Watch mode development build
pnpm build        # Production build via tsdown
pnpm generate:meta # Regenerate src/meta.ts from package.json
```

### Key Scripts

- `release:*` scripts handle version bump → build → publish pipeline
- `vscode:prepublish` ensures production build before publishing
- Uses `tsdown` bundler (not webpack) with external vscode API

### Testing & Quality

```bash
pnpm lint         # ESLint with @ntnyq/eslint-config
pnpm typecheck    # TypeScript validation
```

## Project-Specific Patterns

### ESLint Command Structure

```typescript
interface ESLintCommand {
  name: string
  description: string
  triggers: string[] // e.g., ['/// keep-sorted', '// @keep-sorted']
  commentType?: 'line' | 'block' | 'both'
  url?: string
}
```

### Performance Optimizations

- **Debounced decorations**: Text changes use 300ms debounce with hash-based change detection
- **Separate watchers**: Immediate updates for editor/config changes, debounced for text changes
- **Language filtering**: Extension only activates for configured languages

### Reactive Patterns

- Use `computed()` for derived values (languageId from editor)
- Use `shallowRef()` for complex objects (decorations array)
- Use `watch()` with specific dependencies instead of `watchEffect()` for performance

### Extension Manifest Integration

- Commands/configs are auto-generated in `src/meta.ts` from `package.json`
- Use typed command/config keys from meta file, never hardcode strings
- Scoped configuration with `eslint-command.*` prefix

## External Dependencies & Integration

- **reactive-vscode**: Core framework for reactive VS Code extensions
- **eslint-plugin-command**: The ESLint plugin this extension supports
- **tsdown**: Modern TypeScript bundler (replaces webpack)
- **vscode-ext-gen**: Generates typed metadata from package.json manifest

## Critical Implementation Details

- Extension activates `onStartupFinished` (not language-specific)
- Built-in commands defined in `src/constants/commands.ts` with user commands merged via config
- Completion triggers are hardcoded: space after `///` and `@` after `// `
- Language support uses VS Code's `languages.getLanguages()` API for validation
- All file paths in the codebase use ES modules (`type: "module"` in package.json)

## Common Gotchas

- Always use reactive refs/computed values, never direct VS Code API calls in watchers
- Meta file is generated - edit package.json contributes section instead
- Extension requires `eslint-plugin-command` in user's ESLint config to be useful
- Decorations are updated via reactive system, not direct VS Code decoration API calls
