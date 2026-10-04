import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  Input,
  Progress,
  Stack,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Text,
  useToast,
} from "..";
import { applyThemeVars, clearThemeVars } from "../themes/createTheme";
import { SiteHeader } from "./SiteHeader";
import { CodeBlock } from "./CodeBlock";

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
  { to: "/components/buttons", title: "Buttons", body: "Variants, intents, sizes, loading states.", icon: MousePointerClick },
  { to: "/components/primitives", title: "Primitives", body: "Typography, Stack, Flex, Divider.", icon: Type },
  { to: "/components/display", title: "Display", body: "Card, Badge, Tag, Avatar, Alert, Progress.", icon: LayoutGrid },
  { to: "/components/field-form", title: "Field Form", body: "Schema-driven forms with validation.", icon: ClipboardList },
  { to: "/components/rhf-form", title: "RHF Form", body: "React Hook Form integration.", icon: FileCheck },
  { to: "/components/inputs", title: "Inputs", body: "Slider, Combobox, DatePicker, OTP, Upload.", icon: SlidersHorizontal },
  { to: "/components/table", title: "Table", body: "Sortable, filterable data table.", icon: TableIcon },
  { to: "/components/datatable", title: "Data Table", body: "Typed columns, search, selection.", icon: Database },
  { to: "/components/navigation", title: "Navigation", body: "Tabs, Accordion, Breadcrumb, Pagination.", icon: Navigation },
  { to: "/components/overlays", title: "Overlays", body: "Tooltip, Popover, Drawer, menus.", icon: Layers },
  { to: "/components/modals", title: "Modals", body: "Dialogs and confirmation flows.", icon: Square },
  { to: "/components/toast", title: "Toast", body: "Notifications with progress and pause.", icon: Bell },
];

const stats = [
  { value: "60", suffix: "+", label: "Components" },
  { value: "27", suffix: "", label: "Semantic tokens" },
  { value: "3", suffix: "", label: "Theme modes" },
];

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

function shade(hex: string, amount: number): string {
  const flat = hex.replace("#", "");
  const full =
    flat.length === 3
      ? flat
          .split("")
          .map((c) => c + c)
          .join("")
      : flat;
  const num = parseInt(full, 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0xff) + amount);
  const b = clamp((num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

const themePresets = ["#2563eb", "#635bff", "#9333ea", "#0891b2", "#16a34a", "#dc2626"];

function Playground() {
  const { success } = useToast();
  const [message, setMessage] = useState("Profile saved");
  const [alertsOn, setAlertsOn] = useState(true);
  return (
    <div className="grid gap-0 lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-5 p-8 sm:p-10">
        <Badge tone="info" className="self-start">
          Live demo
        </Badge>
        <div>
          <Heading level={2}>Real components, right here</Heading>
          <Text tone="muted" className="mt-1">
            Everything on this page is an Akriti component. Flip the switch,
            change tabs, send yourself a toast.
          </Text>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Switch
            label="Product updates"
            checked={alertsOn}
            onCheckedChange={setAlertsOn}
          />
          <Tag tone={alertsOn ? "success" : "default"}>
            {alertsOn ? "Subscribed" : "Muted"}
          </Tag>
        </div>
        <Tabs defaultValue="message" className="w-full">
          <TabsList>
            <TabsTrigger value="message">Message</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="message">
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Toast message"
                aria-label="Toast message"
                className="min-w-0 flex-1"
              />
              <Button
                intent="success"
                className="shrink-0"
                onClick={() =>
                  success(message.trim() === "" ? "Hello!" : message, {
                    description: "Sent from the homepage playground.",
                  })
                }
              >
                Send toast
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="max-w-sm pt-2">
              <Progress percent={72} intent="info" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="border-t border-border bg-[#0f172a] p-8 sm:p-10 lg:border-t-0 lg:border-l dark:bg-black/40">
        <CodeBlock title="playground.tsx">
{`const { success } = useToast();

const [alerts, setAlerts] = useState(true);

<Switch
  label="Product updates"
  checked={alerts}
  onCheckedChange={setAlerts}
/>

<Button
  intent="success"
  onClick={() => success("Profile saved")}
/>`}
        </CodeBlock>
      </div>
    </div>
  );
}

function ThemeLab() {
  const labRef = useRef<HTMLDivElement>(null);
  const [primary, setPrimary] = useState("#635bff");

  const apply = (color: string) => {
    setPrimary(color);
    const target = labRef.current;
    if (!target) return;
    applyThemeVars(
      {
        primary: color,
        primaryHover: shade(color, -24),
        focus: color,
      },
      target,
    );
  };

  const reset = () => {
    const target = labRef.current;
    if (target) clearThemeVars(undefined, target);
    setPrimary("#635bff");
  };

  return (
    <div ref={labRef} className="grid gap-0 lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
        <Badge tone="success" className="self-start">
          Theming
        </Badge>
        <div>
          <Heading level={2}>Recolor this panel live</Heading>
          <Text tone="muted" className="mt-1">
            Pick a brand color. Tokens re-apply at runtime inside this panel
            only — the rest of the page is untouched.
          </Text>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {themePresets.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Use ${color} as primary`}
              aria-pressed={primary === color}
              onClick={() => apply(color)}
              style={{ backgroundColor: color }}
              className="h-9 w-9 rounded-full border-2 border-transparent transition-transform hover:scale-110 data-[active=true]:border-foreground"
              data-active={primary === color}
            />
          ))}
          <Button variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 border-t border-border bg-muted/40 p-8 sm:p-10 lg:border-t-0 lg:border-l">
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <Progress percent={64} />
        <div className="flex flex-wrap gap-2">
          <Tag tone="success">Shipped</Tag>
          <Tag tone="warning">Pending</Tag>
          <Tag tone="info">Beta</Tag>
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader onMenu={() => undefined} />
      <main className="mx-auto max-w-6xl px-4">
      <Stack gap={12}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/15 via-info/10 to-success/15 dark:from-primary/25 dark:via-info/15 dark:to-success/20"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, 24, -12, 0], y: [0, -18, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -20, 14, 0], y: [0, 14, -12, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-info/20 blur-3xl dark:bg-info/25"
        />
        <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
          <Stack gap={5} align="center">
            <Badge tone="info">
              <Sparkles size={12} aria-hidden />
              <span className="ml-1">React · TypeScript · Tokens</span>
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
              <Button variant="primary" onClick={() => navigate("/components/primitives")}>
                Explore components
                <ArrowRight size={16} aria-hidden />
              </Button>
              <Button variant="outline" onClick={() => navigate("/components/field-form")}>
                <Calendar size={16} aria-hidden />
                Live demos
              </Button>
            </Stack>
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-start justify-center gap-8 pt-2"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dd className="font-display text-2xl font-bold sm:text-3xl">
                    {stat.value}
                    {stat.suffix}
                  </dd>
                  <dt className="text-xs tracking-wider text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </motion.dl>
          </Stack>
        </div>
      </motion.section>

      <motion.section
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        <motion.div
          variants={rise}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <Playground />
        </motion.div>
      </motion.section>

      <motion.section
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        <motion.div
          variants={rise}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <ThemeLab />
        </motion.div>
      </motion.section>

      <motion.section
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        <motion.div
          variants={rise}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={rise}>
            <Card className="group h-full transition-shadow hover:shadow-md">
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
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        <Stack gap={4}>
          <motion.div variants={rise}>
            <Heading level={2}>Component catalog</Heading>
            <Text tone="muted">
              Every component below is live — open a page to interact with it
              in both themes.
            </Text>
          </motion.div>
          <motion.div
            variants={rise}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {catalog.map((entry) => (
              <motion.div key={entry.to} variants={rise}>
              <Link to={entry.to} className="group block h-full">
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
              </motion.div>
            ))}
          </motion.div>
        </Stack>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden rounded-2xl border border-border bg-surface"
      >
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
              <Button variant="primary" onClick={() => navigate("/components/inputs")}>
                See components in action
                <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
          <div className="border-t border-border bg-[#0f172a] p-8 sm:p-10 lg:border-t-0 lg:border-l dark:bg-black/40">
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
      </motion.section>
      </Stack>
      </main>
      <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
        Akriti UI component showcase — import from{" "}
        <code className="rounded bg-muted px-1 py-0.5">akriti-ui</code>.
      </footer>
    </div>
  );
}
