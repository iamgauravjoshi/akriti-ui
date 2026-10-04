import { useState } from "react";
import { Button, Stack, Text, useTheme } from "../..";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";

const tokenGroups = [
  { name: "Surfaces", tokens: ["--ak-background", "--ak-foreground", "--ak-surface", "--ak-muted", "--ak-border"] },
  { name: "Brand", tokens: ["--ak-primary", "--ak-primary-hover", "--ak-secondary"] },
  { name: "Semantics", tokens: ["--ak-success", "--ak-warning", "--ak-danger", "--ak-info"] },
  { name: "Shape", tokens: ["--ak-radius-sm", "--ak-radius-md", "--ak-shadow-md", "--ak-z-toast"] },
];

export default function Theming() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [primary, setPrimary] = useState("#635bff");
  return (
    <Stack gap={8} className="max-w-3xl">
      <section>
        <h2 className="font-display text-xl font-semibold">1. Semantic tokens</h2>
        <Text tone="muted" className="mt-1">
          Components never hard-code colors — they reference{" "}
          <code className="rounded bg-muted px-1 font-mono text-[13px]">--ak-*</code>{" "}
          variables that flip per theme. Try the toggle: every demo on this
          site re-themes instantly.
        </Text>
        <div className="mt-3">
          <Example title="Live theme switch">
            <div className="flex flex-wrap items-center gap-3">
              {(["light", "dark", "system"] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={theme === mode ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setTheme(mode)}
                >
                  {mode[0].toUpperCase() + mode.slice(1)}
                  {mode === "system" ? ` (${resolvedTheme})` : ""}
                </Button>
              ))}
            </div>
          </Example>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tokenGroups.map((group) => (
            <div key={group.name} className="rounded-xl border border-border bg-surface p-4">
              <p className="mb-2 text-sm font-semibold">{group.name}</p>
              <ul className="space-y-1">
                {group.tokens.map((token) => (
                  <li key={token}>
                    <code className="font-mono text-xs text-muted-foreground">{token}</code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">2. Custom themes</h2>
        <Text tone="muted" className="mt-1">
          Pass flat token keys or nested sections to{" "}
          <code className="rounded bg-muted px-1 font-mono text-[13px]">createTheme</code>{" "}
          and hand the result to{" "}
          <code className="rounded bg-muted px-1 font-mono text-[13px]">ThemeProvider</code>.
          Flat keys win over section values.
        </Text>
        <div className="mt-3">
          <CodeBlock title="src/theme.ts">
{`import { createTheme } from "akriti-ui";

export const theme = createTheme({
  colors: { primary: "#635bff" },
  radius: { radiusMd: "10px" },
});`}
          </CodeBlock>
        </div>
        <div className="mt-3">
          <Example title="Try a primary color">
            <div className="flex items-center gap-3">
              <input
                type="color"
                aria-label="Pick a primary color"
                value={primary}
                onChange={(event) => setPrimary(event.target.value)}
                className="h-10 w-12 cursor-pointer rounded-md border border-border bg-surface p-1"
              />
              <code className="font-mono text-sm">{primary}</code>
              <span
                aria-hidden
                className="h-6 w-6 rounded-full border border-border"
                style={{ backgroundColor: primary }}
              />
            </div>
          </Example>
        </div>
      </section>
    </Stack>
  );
}
