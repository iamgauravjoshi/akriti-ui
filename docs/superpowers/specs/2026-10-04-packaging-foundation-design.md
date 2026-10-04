# akriti-ui Packaging Foundation — Design Spec

Date: 2026-10-04 | Status: approved design, pending spec review

## 1. Background

akriti-ui is a React 19 + TypeScript + Vite 7 + Tailwind CSS v4 component
library (`src/index.ts` barrel). Goal: publish `akriti-ui` to the npm
registry so any project can `npm i akriti-ui` and use it AntD-style.
Today there is no library build, no `exports` map, and `"private": true`.

## 2. Goals / non-goals

Goals:

- `npm i akriti-ui` works in ESM and CJS consumers with types.
- One CSS import (`akriti-ui/style.css`); no Tailwind setup on the consumer.
- No global element styles leak into consumer apps.
- Showcase app keeps working as the dev/demo environment; ships nothing.

Non-goals: new components, React 18 support widening, docs site, CI.

## 3. Design

### 3.1 Build outputs (Vite library mode)

- Entry: `src/index.ts`. Formats: `es` + `cjs`.
- Declarations via `tsc -p tsconfig.lib.json` (`emitDeclarationOnly`,
  rooted at `src/index.ts`, so only the reachable library graph gets
  `.d.ts`). No declaration bundler dependency.
- `dist/`: `akriti-ui.mjs`, `akriti-ui.cjs` (+ maps), `style.css`,
  `index.d.ts` + co-located component declarations. `publicDir: false`
  so no app assets leak into the package.
- Scripts: `build:lib` (library); existing `build` unchanged (showcase).

### 3.2 Manifest (`package.json`)

- Remove `"private"`. Keep version `1.0.0` for first public release.
- `exports`: `.` → `{ types, import, default(require) }`;
  `./style.css` → `./dist/style.css`; `./package.json` passthrough.
- `files: ["dist"]`, `sideEffects: ["*.css"]`.
- `peerDependencies`: `react` + `react-dom` `^19`.
- Radix, lucide-react, clsx, tailwind-merge: bundled, not peers.
- `prepublishOnly`: `build:lib`.

### 3.3 CSS strategy

- New entry `src/akriti.css`: `@import "tailwindcss" source(none);` +
  explicit `@source "./components";` / `@source "./providers";` +
  `@import "./styles/tokens.css";` — utilities are scoped to library code
  only (verified: showcase-only classes like `max-w-6xl` absent from
  output); `--ak-*` tokens ride along via `@theme inline`.
- Must NOT reuse `src/index.css` (contains global `body` rules).
- Preflight ships inside `style.css` (AntD-style baseline), documented
  as included so consumers don't double-apply their own reset blindly.
- Consumer: `import "akriti-ui/style.css"` once at app root.

### 3.4 Showcase separation

- `dev` / `preview` scripts and `src/App.tsx` routing unchanged.
- Showcase continues importing from `src` (source), never from `dist`.
- Only `dist` is packed; no demo/legacy code ships.

### 3.5 Verification (acceptance criteria)

- `tsc -b` + `vite build` (showcase) + `build:lib` all exit 0.
- `npm pack --dry-run` lists only `dist` (+ readme/license).
- Node smoke-imports the CJS bundle without `document` access.
- `dist/style.css` contains `--ak-primary` and a component utility
  (e.g. `bg-primary` compiled output).
- Existing `vitest` suite passes; `dev` showcase renders.

## 4. Open details (resolved)

- Package name: `akriti-ui`, public npm registry.
- React 18 compat: out of scope; peer stays `^19`.
- Legacy `src/components/common` + old demos: excluded from `tsconfig.app.json`
  already; recommended follow-up is deletion, not part of this spec.
