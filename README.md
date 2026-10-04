# Akriti UI

Themed, accessible React components with semantic design tokens,
light/dark/system themes, and strict TypeScript APIs.

> Status: pre-release. The package layout is npm-ready (`exports`, types,
> single CSS file) but the first registry publish is still ahead —
> see `docs/ROADMAP.md` (M8). Until then, install from git.

## Installation

```bash
npm install akriti-ui
```

```tsx
import { Button, ThemeProvider } from "akriti-ui";
import "akriti-ui/style.css";

<ThemeProvider>
  <Button intent="success">Save</Button>
</ThemeProvider>;
```

No Tailwind setup is required in the consumer: `style.css` ships the
compiled utilities plus the `--ak-*` theme tokens.

## Components

Typography (`Text`, `Heading`, `Code`, `Kbd`), layout (`Stack`, `Flex`,
`Divider`, `VisuallyHidden`), buttons (`Button`, `IconButton`,
`CloseButton`), form inputs (`Input`, `Textarea`, `PasswordInput`,
`Checkbox`, `RadioGroup`, `Select` / `MultiSelect`, `Switch`, `Slider`,
`Combobox`, `DatePicker`, `OtpInput`, `Upload`), forms (`Form` + React
Hook Form wrappers, `FieldForm`), overlays (`Dialog`, `Modal`, `Drawer`,
`Tooltip`, `Popover`, `DropdownMenu`), navigation (`Tabs`, `Accordion`,
`Breadcrumb`, `Pagination`), data display (`Table`, `DataTable`, `Card`,
`Badge`, `Tag`, `Avatar`, `Empty`), feedback (`Spinner`, `Toast` /
`Toaster`, `Alert`, `Progress`, `Skeleton`).

Open `npm run dev` for the showcase homepage with a live catalog.

## Theming

```tsx
import { createTheme, ThemeProvider } from "akriti-ui";

const theme = createTheme({
  colors: { primary: "#635bff" },
  radius: { radiusMd: "8px" },
});

<ThemeProvider theme={theme} defaultTheme="system">
  <App />
</ThemeProvider>;
```

`theme` accepts flat token keys (`primary`, `radiusMd`, …) or nested
sections (`colors`, `radius`, `shadow`, `zIndex`, `duration`); flat keys
win. Tokens resolve to `--ak-*` CSS variables; `data-theme` switches
light/dark. `useTheme()` exposes `{ theme, resolvedTheme, setTheme }`.

## Development

```bash
npm run dev     # showcase app
npm run test    # vitest (single run)
npm run lint    # eslint
npm run build   # typecheck + showcase build
npm run build:lib  # publishable dist/
```

Conventions: `docs/CONVENTIONS.md`. Roadmap: `docs/ROADMAP.md`.
Public API only via `src/index.ts`.

## License

To be decided before first publish (M8).
