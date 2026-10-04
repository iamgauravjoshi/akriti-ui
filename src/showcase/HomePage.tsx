import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Copy } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Code,
  Heading,
  Stack,
  Text,
} from "..";

const features = [
  {
    title: "Semantic theming",
    body: "Token-driven light, dark, and system modes with runtime overrides via CSS variables.",
  },
  {
    title: "Accessible by default",
    body: "Radix primitives, keyboard support, focus management, and ARIA semantics built in.",
  },
  {
    title: "Strict TypeScript",
    body: "Typed props, generics for tables and forms, and shipped declaration files.",
  },
  {
    title: "Tree-shakable",
    body: "One barrel entry, side-effect-free modules, and a single scoped stylesheet.",
  },
];

const catalog: { to: string; title: string; body: string }[] = [
  { to: "/buttons", title: "Buttons", body: "Variants, intents, sizes, loading states." },
  { to: "/primitives", title: "Primitives", body: "Typography, Stack, Flex, Divider." },
  { to: "/display", title: "Display", body: "Card, Badge, Tag, Avatar, Alert, Progress." },
  { to: "/form-demo", title: "Field form", body: "Schema-driven forms with validation." },
  { to: "/form-demo-02", title: "RHF form", body: "React Hook Form integration." },
  { to: "/entry", title: "Inputs", body: "Slider, Combobox, DatePicker, OTP, Upload." },
  { to: "/table", title: "Table", body: "Sortable, filterable data table." },
  { to: "/datatable", title: "Data table", body: "Typed columns, search, selection." },
  { to: "/navigation", title: "Navigation", body: "Tabs, Accordion, Breadcrumb, Pagination." },
  { to: "/overlays", title: "Overlays", body: "Tooltip, Popover, Drawer, menus." },
  { to: "/modals", title: "Modals", body: "Dialogs and confirmation flows." },
  { to: "/toast", title: "Toast", body: "Notifications with progress and pause." },
];

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText("npm install akriti-ui");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Stack gap={10}>
      <section className="py-8 text-center">
        <Stack gap={4} align="center">
          <Badge tone="info">v1.0.0 · pre-release</Badge>
          <Heading level={1}>Akriti UI</Heading>
          <Text tone="muted" size="lg" className="max-w-xl">
            Themed, accessible React components with semantic design tokens
            and strict TypeScript APIs.
          </Text>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 shadow-sm">
            <Code>npm install akriti-ui</Code>
            <button
              type="button"
              onClick={copyInstall}
              aria-label={copied ? "Copied" : "Copy install command"}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <Stack direction="row" gap={3} justify="center">
            <Button variant="primary" onClick={() => navigate("/primitives")}>
              Explore components
            </Button>
            <Button variant="outline" onClick={() => navigate("/form-demo")}>
              Try the form demo
            </Button>
          </Stack>
        </Stack>
      </section>

      <section>
        <Stack
          direction="row"
          gap={4}
          wrap
          justify="center"
          className="[&>*]:min-w-60 [&>*]:flex-1"
        >
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text size="sm" tone="muted">
                  {feature.body}
                </Text>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </section>

      <section>
        <Stack gap={4}>
          <Heading level={2}>Component catalog</Heading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((entry) => (
              <Link key={entry.to} to={entry.to} className="block">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle>{entry.title}</CardTitle>
                    <CardDescription>{entry.body}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </Stack>
      </section>
    </Stack>
  );
}
