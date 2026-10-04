# AGENTS.md — akriti-ui

React 19 + TypeScript + Vite 7 component library with Tailwind CSS v4. No monorepo, no CI, no `opencode.json`.

## Commands

- `npm run dev` — Vite dev server (showcase app).
- `npm run build` — `tsc -b && vite build` (typecheck + build; run before claiming done).
- `npm run lint` — `eslint .`.
- `npm run test` — `vitest run` (single run). `npm run test:watch` for watch mode.
- Single test file: `npx vitest run src/components/buttons/Button.test.tsx`.

## Structure

- `src/index.ts` — public library entry. Only export new components from here.
- `src/components/{buttons,forms,overlays,feedback,data-display}/` — canonical components. New work goes here.
- `src/components/common/`, `src/components/*Demo*.tsx`, `src/components/FormDemo*.tsx` — legacy/unexported. Do not import from these; do not add to them.
- `src/showcase/` — dev demo app routed by `src/App.tsx` (not part of the library). Add demos here, not in `App.tsx` library code.
- `src/lib/cn.ts` (`cn()` = clsx + twMerge), `src/lib/variants.ts` (`resolveIntent`, `fieldSizeClasses`, `fieldChrome`), `src/types/common.ts` (`Size`, `SemanticIntent`, `ThemeMode`).
- Theming: `src/tokens/tokens.ts` + `src/styles/tokens.css` (keep `--ak-*` values in sync), Tailwind bridge via `@theme inline` in `tokens.css`, runtime via `src/providers/ThemeProvider.tsx` + `src/themes/createTheme.ts` (`data-theme="light|dark"`, `customTheme` prop applies CSS-var overrides).
- Tests: Vitest + jsdom + RTL (`src/test/setup.ts`), colocated `*.test.tsx`.

## Conventions

- No path alias configured — use relative imports. Use `import type` for types (`verbatimModuleSyntax`).
- Strict TS: `noUnusedLocals`/`noUnusedParameters`, `erasableSyntaxOnly` (no enums/namespaces), `noUncheckedSideEffectImports`.
- Styling: Tailwind utilities referencing theme tokens (`bg-primary`, `text-foreground`, `border-border`, etc.) composed with `cn()`; shared field chrome via `fieldChrome(error)` / `fieldSizeClasses`.
- `SemanticIntent` includes `"error"` as alias — always normalize with `resolveIntent()` (maps `error` → `danger`) before styling; `Button` also accepts deprecated `color` prop, prefer `intent`.
- Components use `forwardRef`, default `type="button"`, `size="md"`; loading/disabled states must set `disabled` + `aria-busy`/`aria-disabled`.
- Known broken import: `src/components/buttons/Button.test.tsx:4` imports `"../components/buttons/Button"` (should be `"./Button"`). Fix to sibling-relative when touching tests.
