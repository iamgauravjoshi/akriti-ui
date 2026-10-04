# Akriti UI — Roadmap to a production component library

Goal: `npm i akriti-ui` gives a coherent, accessible, themed React kit.
Quality over count: 25 excellent components beats 100 incomplete ones.

## Audit (2026-10-04, branch `feat/foundation-milestone-1`)

1. **Public exports** — `src/index.ts` barrel covers buttons, form inputs,
   Select, Switch, RHF Form wrappers, FieldForm, Dialog/Modal, Table,
   Spinner, Toast, ThemeProvider, `createTheme`, `cn`. No leakage.
2. **Package/build** — Vite *app* build only; `"private": true`; no
   `exports` map, no declarations, no lib CSS. Approved spec exists:
   `docs/superpowers/specs/2026-10-04-packaging-foundation-design.md`.
3. **Theme** — light/dark/system + `customTheme` flat overrides via
   `applyThemeVars`; `data-theme` attribute; SSR-safe guards. No `theme`
   prop, no nested sections, no component overrides (by design, for now).
4. **Tokens** — colors fully modeled in `tokens.ts` + `tokens.css` (in sync).
   Radii/shadows/z/durations/typography exist **only in CSS**, not in TS.
5. **API consistency** — `Size`, `SemanticIntent` shared; `resolveIntent`
   normalizes `error→danger`; `cn()` everywhere. Wrinkle: `Button` keeps a
   deprecated `color` alias (keep for compat); RadioGroup previously dropped
   rest props (fixed).
6. **Accessibility** — Radix for Dialog/Switch; `aria-busy/disabled`,
   `role=alert` errors, labelled fields. No reduced-motion handling yet.
7. **Tests** — Vitest + RTL + user-event, colocated, 8/8 passing. Needs
   explicit `cleanup` in setup (no vitest `globals`).
8. **CSS bundling** — Tailwind v4 `@theme inline` → `var(--ak-*)`; no lib
   CSS entry yet; `index.css` has global `body` rules (must not ship).
9. **Showcase** — routed demo app (`src/showcase/*`), dev-only. No docs
   framework; fine until architecture stabilizes.
10. **Publish readiness** — not ready: see (2). No license file either.

Baselines: `test` 8/8 pass · `build` passes when machine is idle (hangs
under heavy load from other agents' processes — environmental, retry) ·
`lint` 63 pre-existing problems, all in legacy `components/common`,
old demos, or established export patterns; legacy excluded from `tsc`
via `tsconfig.app.json`, deletion recommended.

## Milestones

- **M1 — foundation** (this branch): tokens in TS, `theme` prop +
  nested `createTheme` sections, `docs/CONVENTIONS.md`, library build +
  manifest + `akriti.css`, README rewrite. No component rewrites.
- **M2 — core API cleanup**: `color`→`intent` migration path, `style`
  prop pass-through where missing, `FieldForm` number coercion.
- **M3 — layout/type primitives**: Typography (Text/Heading/Code/Kbd),
  Stack/Flex/Divider, `VisuallyHidden`.
- **M4 — display/feedback batch**: Card, Badge, Tag, Alert, Skeleton,
  Progress, Avatar, Empty.
- **M5 — overlays/navigation batch**: Tooltip, Popover, Tabs, Accordion,
  Breadcrumb, Pagination, Drawer, DropdownMenu.
- **M6 — advanced entry**: DatePicker, Slider, Upload, OTP, Autocomplete.
- **M7 — DataTable**: typed columns, controlled sorting/filtering,
  expandable rows, server mode, virtualization.
- **M8 — publish**: `examples/basic-vite` consumer fixture, versioning +
  changelog conventions, docs polish, npm release.

## Conventions

`docs/CONVENTIONS.md` is normative for new code. `AGENTS.md` for agents.
Public API only via `src/index.ts`. Backwards compat for `Button.color`.
