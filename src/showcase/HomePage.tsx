import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  Braces,
  Calendar,
  Check,
  ClipboardList,
  Copy,
  Database,
  FileCheck,
  Keyboard,
  Layers,
  LayoutGrid,
  MousePointerClick,
  Navigation,
  Package,
  Palette,
  SlidersHorizontal,
  Sparkles,
  Square,
  Table as TableIcon,
  Type,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Code,
  Heading,
  Stack,
  Text,
} from "..";

const features = [
  {
    icon: Palette,
    title: "Semantic theming",
    body: "Token-driven light, dark, and system modes with runtime overrides through CSS variables.",
  },
  {
    icon: Keyboard,
    title: "Accessible by default",
    body: "Radix primitives, keyboard support, focus management, and ARIA semantics built in.",
  },
  {
    icon: Braces,
    title: "Strict TypeScript",
    body: "Typed props, generics for tables and forms, and shipped declaration files.",
  },
  {
    icon: Package,
    title: "Tree-shakable",
    body: "One barrel entry, side-effect-free modules, and a single scoped stylesheet.",
  },
];

const catalog = [
  { to: "/buttons", title: "Buttons", body: "Variants, intents, sizes, loading states.", icon: MousePointerClick },
  { to: "/primitives", title: "Primitives", body: "Typography, Stack, Flex, Divider.", icon: Type },
  { to: "/display", title: "Display", body: "Card, Badge, Tag, Avatar, Alert, Progress.", icon: LayoutGrid },
  { to: "/form-demo", title: "Field Form", body: "Schema-driven forms with validation.", icon: ClipboardList },
  { to: "/form-demo-02", title: "RHF Form", body: "React Hook Form integration.", icon: FileCheck },
  { to: "/entry", title: "Inputs", body: "Slider, Combobox, DatePicker, OTP, Upload.", icon: SlidersHorizontal },
  { to: "/table", title: "Table", body: "Sortable, filterable data table.", icon: TableIcon },
  { to: "/datatable", title: "Data Table", body: "Typed columns, search, selection.", icon: Database },
  { to: "/navigation", title: "Navigation", body: "Tabs, Accordion, Breadcrumb, Pagination.", icon: Navigation },
  { to: "/overlays", title: "Overlays", body: "Tooltip, Popover, Drawer, menus.", icon: Layers },
  { to: "/modals", title: "Modals", body: "Dialogs and confirmation flows.", icon: Square },
  { to: "/toast", title: "Toast", body: "Notifications with progress and pause.", icon: Bell },
];

const stats = [
  { value: "60+", label: "Components" },
  { value: "27", label: "Semantic tokens" },
  { value: "3", label: "Theme modes" },
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
    <Stack gap={12}>
      <section className="relative overflow-hidden rounded-2xl border border-border">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/15 via-info/10 to-success/15 dark:from-primary/25 dark:via-info/15 dark:to-success/20"
        />
        <div
          aria-hidden
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30"
        />
        <div
          aria-hidden
          className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-info/20 blur-3xl dark:bg-info/25"
        />
        <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
          <Stack gap={5} align="center">
            <Badge tone="info">
              <Sparkles size={12} aria-hidden />
              <span className="ml-1">v1.0.0 · pre-release</span>
            </Badge>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
              Interfaces that feel{" "}
              <span className="bg-gradient-to-r from-primary via-info to-success bg-clip-text text-transparent">
                inevitable
              </span>
            </h1>
            <Text tone="muted" size="lg" className="max-w-xl">
              Akriti UI is a themed, accessible React component system with
              semantic design tokens and strict TypeScript APIs.
            </Text>
            <div className="flex flex-wrap items-center justify-center gap-3">
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
            </div>
            <Stack direction="row" gap={3} justify="center">
              <Button variant="primary" onClick={() => navigate("/primitives")}>
                Explore components
                <ArrowRight size={16} aria-hidden />
              </Button>
              <Button variant="outline" onClick={() => navigate("/form-demo")}>
                <Calendar size={16} aria-hidden />
                Live demos
              </Button>
            </Stack>
            <div className="flex flex-wrap items-center justify-center gap-8 pt-2">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl font-bold sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-xs tracking-wider text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Stack>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="group transition-shadow hover:shadow-md">
              <CardHeader>
                <span className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon size={18} aria-hidden />
                </span>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text size="sm" tone="muted">
                  {feature.body}
                </Text>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Stack gap={4}>
          <div>
            <Heading level={2}>Component catalog</Heading>
            <Text tone="muted">
              Every component below is live — open a page to interact with it
              in both themes.
            </Text>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((entry) => (
              <Link key={entry.to} to={entry.to} className="group block">
                <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                  <CardHeader>
                    <span className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                      <entry.icon size={18} aria-hidden />
                    </span>
                    <CardTitle className="flex items-center gap-1.5">
                      {entry.title}
                      <ArrowRight
                        size={14}
                        aria-hidden
                        className="text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100"
                      />
                    </CardTitle>
                    <Text size="sm" tone="muted">
                      {entry.body}
                    </Text>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </Stack>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
            <Badge tone="success" className="self-start">
              Developer experience
            </Badge>
            <Heading level={2}>Install it. Import it. Ship it.</Heading>
            <Text tone="muted">
              One package, one stylesheet, zero configuration. Tokens adapt
              to light and dark automatically.
            </Text>
            <div>
              <Button variant="primary" onClick={() => navigate("/entry")}>
                See components in action
                <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
          <div className="border-t border-border bg-[#0f172a] p-8 sm:p-10 dark:bg-black/40">
            <pre className="overflow-x-auto font-mono text-sm leading-relaxed">
              <code>
                <span className="text-slate-400">{"import {"}</span>
                <span className="text-slate-100">{" Button, Card "}</span>
                <span className="text-slate-400">{"} from "}</span>
                <span className="text-emerald-300">{"'akriti-ui'"}</span>
                <span className="text-slate-400">{";"}</span>
                {"\n"}
                <span className="text-slate-400">{"import "}</span>
                <span className="text-emerald-300">{"'akriti-ui/style.css'"}</span>
                <span className="text-slate-400">{";"}</span>
                {"\n\n"}
                <span className="text-sky-300">{"<Card>"}</span>
                {"\n"}
                <span className="text-slate-100">{"  <Button "}</span>
                <span className="text-amber-200">{"intent"}</span>
                <span className="text-slate-100">{"="}</span>
                <span className="text-emerald-300">{'"success"'},
                </span>
                {"\n"}
                <span className="text-slate-100">{"  >Save changes</Button>"}</span>
                {"\n"}
                <span className="text-sky-300">{"</Card>"}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>
    </Stack>
  );
}
