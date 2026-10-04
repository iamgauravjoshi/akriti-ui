import { Alert, Button, Stack, Text } from "../..";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";

export default function GettingStarted() {
  return (
    <Stack gap={8}>
      <section>
        <h2 className="font-display text-xl font-semibold">1. Install the package</h2>
        <Text tone="muted" className="mt-1">
          Akriti UI needs React 19 and one stylesheet import — no Tailwind
          setup required in your app.
        </Text>
        <div className="mt-3">
          <CodeBlock title="Terminal">npm install akriti-ui</CodeBlock>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">2. Add the stylesheet once</h2>
        <Text tone="muted" className="mt-1">
          Import it at your app root. It ships compiled utilities plus the
          theme tokens, scoped so they never clash with your styles.
        </Text>
        <div className="mt-3">
          <CodeBlock title="src/main.tsx">
{`import "akriti-ui/style.css";`}
          </CodeBlock>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">3. Render components</h2>
        <Text tone="muted" className="mt-1">
          Wrap your app in{" "}
          <code className="rounded bg-muted px-1 font-mono text-[13px]">
            ThemeProvider
          </code>{" "}
          for light/dark/system support, then use any component. Try it live:
        </Text>
        <div className="mt-3">
          <Example title="Live example">
            <Button intent="success" onClick={() => undefined}>
              Save changes
            </Button>
          </Example>
        </div>
        <div className="mt-3">
          <CodeBlock title="src/App.tsx">
{`import { Button, Card, ThemeProvider } from "akriti-ui";
import "akriti-ui/style.css";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Card>
        <Button intent="success">Save changes</Button>
      </Card>
    </ThemeProvider>
  );
}`}
          </CodeBlock>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">4. Learn the conventions</h2>
        <Text tone="muted" className="mt-1">
          Sizes run <code className="rounded bg-muted px-1 font-mono text-[13px]">xs → xl</code>,
          semantic color runs through <code className="rounded bg-muted px-1 font-mono text-[13px]">intent</code>,
          and interactive components forward refs with full keyboard support.
        </Text>
        <div className="mt-3">
          <Alert tone="info" title="Next step">
            Continue with Theming to match the system to your brand.
          </Alert>
        </div>
      </section>
    </Stack>
  );
}
