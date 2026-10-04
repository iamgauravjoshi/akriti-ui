# basic-vite — akriti-ui consumer smoke test

Proves the published package works outside this repository.

## Run it

```bash
# 1. Build the library distributable first (from the repo root)
npm run build:lib

# 2. Install the fixture (resolves akriti-ui via file:../..)
cd examples/basic-vite
npm install

# 3. Typecheck + production build of the consumer
npm run build

# 4. Or run the dev server and open the page
npm run dev
```
## What it validates

- `file:../..` installation resolves `exports` (`.` and `./style.css`)
- `akriti-ui/style.css` loads (the card renders styled)
- `ThemeProvider` + components work with the consumer's own React
- TypeScript declarations resolve (`tsc -b` passes in the fixture)
- The production bundle builds without warnings about externals
