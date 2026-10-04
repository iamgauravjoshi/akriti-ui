# Changelog

Format: Keep a Changelog. Versioning: SemVer (`feat` → minor, `fix` → patch,
breaking public API → major with migration notes).

## [Unreleased]

### Added

- Foundation (M1): extended token model (radius/shadow/z/duration),
  nested `createTheme` sections, `ThemeProvider theme` prop, library build
  (`dist/` ESM+CJS + declarations + scoped `style.css`), packaging manifest,
  README, `docs/ROADMAP.md`, `docs/CONVENTIONS.md`.
- Core API cleanup (M2): `@deprecated color` alias path, `style`
  pass-through on custom-root components, `FieldForm` number fields.
- Primitives (M3): `Text`, `Heading`, `Code`, `Kbd`, `Stack`, `Flex`,
  `Divider`, `VisuallyHidden`.
- Display/feedback (M4): `Card` compound, `Badge`, `Tag`, `Avatar`,
  `Empty`, `Alert`, `Progress`, `Skeleton`.
- Navigation/overlays (M5): `Tabs`, `Accordion`, `Breadcrumb`,
  `Pagination`, `Tooltip`, `Popover`, `Drawer`, `DropdownMenu`.
- Entry (M6): `Slider`, `Upload`, `OtpInput`, `Combobox`, `DatePicker`.
- Data (M7): `DataTable` with typed accessor columns, sorting, search,
  pagination, selection.
- Showcase homepage with install snippet and component catalog (M8).
- Consumer fixture: `examples/basic-vite`.
- Review fixes: deleted unreachable legacy code (`components/common`,
  old demos); `Table` converged on a single responsive table;
  `FieldForm` surfaces async submit errors; `DatePicker` clear button is
  a real sibling button; `OtpInput` preserves digit positions;
  `Select`/`Combobox` expose `aria-activedescendant`;
  `Text`/`Stack` are generic polymorphic components;
  `Toast` deduplicates rapid calls correctly.
- Package hygiene: removed unused deps (`axios`, `lodash`, `classnames`,
  `framer-motion`); showcase-only deps moved to devDependencies;
  version reset to `0.1.0` for the pre-release line; CI workflow added.

### Removed

- `Toast` `animation` option (accepted but never rendered).
- Legacy `src/components/common`, old demo files, `App.css`,
  unused `react.svg` asset.
