# AGENTS.md

This file helps AI coding agents work effectively in this repository.

## Project Snapshot

- Type: VS Code extension (`eslint-command`)
- Language: TypeScript (strict), ESM source, bundled to `dist/index.js`
- Package manager: `pnpm` (`pnpm@11.3.0`)
- Runtime target: VS Code `^1.120.0`

## Fast Start

- Install deps: `pnpm install`
- Dev build (watch): `pnpm dev`
- Production build: `pnpm build`
- Typecheck: `pnpm typecheck`
- Lint: `pnpm lint`
- Format check: `pnpm format:check`
- Format fix: `pnpm format`

## Validation Before Finishing Changes

Run this sequence unless the task is documentation-only:

1. `pnpm format:check`
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm build`

There is currently no dedicated automated test suite in this repository. Validate feature behavior manually in an Extension Development Host when changes affect runtime behavior.

## Release and Packaging

- Prepublish hook: `pnpm vscode:prepublish` (build only)
- Package `.vsix`: `pnpm pack`
- Full release pipeline: `pnpm release`
- Release check gate: `pnpm release:check`

## Source Map (Where Things Live)

- `src/index.ts`: extension activation/deactivation wiring
- `src/config.ts`: reactive config access + language validation
- `src/features/commands.ts`: insert-command command registration and UI
- `src/features/completions.ts`: completion provider for `/// ` and `// @`
- `src/features/annotations.ts`: decoration scanning and hover annotations
- `src/composables/commands.ts`: merged command list (built-in + user config)
- `src/constants/commands.ts`: built-in eslint-command definitions
- `src/utils/*`: helpers (docs URLs, markdown, regex escape, logger)

## Non-Obvious Rules

- `src/meta.ts` is generated. Do not hand-edit it.
- If `package.json` contributes/metadata changes, regenerate with: `pnpm generate:meta`.
- Keep `vscode` external in bundle behavior aligned with `tsdown.config.ts`.
- Keep extension entrypoint at `dist/index.js` (configured in `package.json`).
- Prefer existing `reactive-vscode` composables and watch patterns used by nearby modules.

## Code Style and Tooling

- Formatter: `oxfmt` (2 spaces, single quotes, no semicolons, trailing commas)
- Linter: `oxlint` (with project-specific relaxed rules)
- TS config: strict mode enabled; `moduleResolution: "Bundler"`

## Safe Change Guidelines

- Scope edits to the smallest affected feature module.
- Avoid broad refactors while implementing feature-specific fixes.
- Preserve completion triggers and annotation behavior unless task explicitly changes them.
- When adding config options, mirror `package.json` contributes updates with regenerated metadata.

## References

- Project overview and user-facing behavior: [README.md](README.md)
- Extension manifest and scripts: [package.json](package.json)
- Build config: [tsdown.config.ts](tsdown.config.ts)
- TypeScript settings: [tsconfig.json](tsconfig.json)
