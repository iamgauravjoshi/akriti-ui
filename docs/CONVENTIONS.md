# Akriti UI — Component conventions (normative for new code)

## Shared types (`src/types/common.ts`)

- `Size = "xs" | "sm" | "md" | "lg" | "xl"` — default `md` unless the
  component only makes sense smaller/larger.
- `SemanticIntent = "default" | "success" | "warning" | "danger" | "info" | "error"`
  — `"error"` is an alias; always normalize with `resolveIntent()`
  (`error` → `danger`) before styling.
- `ThemeMode = "light" | "dark" | "system"`.

`Button` still accepts deprecated `color`; prefer `intent`. Keep `color`
working until a deliberate breaking release.

## Styling

- Compose classes with `cn()` (`clsx` + `tw-merge`).
- Use semantic token utilities (`bg-primary`, `text-foreground`,
  `border-border`, …), never hard-coded colors.
- Reuse `fieldSizeClasses` / `fieldChrome(error)` for form controls.

## Component shape

- `forwardRef`, `className` + `style` pass-through, `displayName`.
- Buttons default `type="button"`; loading implies `disabled` +
  `aria-busy`/`aria-disabled`.
- Controlled/uncontrolled pairs: `value`/`defaultValue` with
  `onValueChange`; open state with `onOpenChange`.
- Accept `ReactNode` for icons, not icon-name strings.
- Use `import type` for type-only imports (`verbatimModuleSyntax`).

## Boundaries

- Public API only through `src/index.ts`.
- `src/components/common/` and root `*Demo*` files are legacy: do not
  import from them.
- Tests colocated (`*.test.tsx`), behavior-focused; showcase demos live
  in `src/showcase/`, never in component files.
