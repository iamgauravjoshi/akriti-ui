import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from "framer-motion";
import {
	ArrowRight,
	Bell,
	Blocks,
	Braces,
	Check,
	ClipboardList,
	Copy,
	Database,
	FileCheck,
	Github,
	Keyboard,
	Layers,
	LayoutGrid,
	Moon,
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
	Avatar,
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Code,
	Heading,
	Input,
	Modal,
	Progress,
	Select,
	Stack,
	Switch,
	Table,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Tag,
	Text,
	useToast,
} from "..";
import { applyThemeVars, clearThemeVars } from "../themes/createTheme";
import { GITHUB_URL } from "./site";
import { SiteHeader } from "./SiteHeader";

const whyItems = [
	{
		icon: Keyboard,
		title: "Accessible by default",
		body: "Radix primitives, full keyboard support, focus management, and ARIA semantics in every interactive component.",
	},
	{
		icon: Braces,
		title: "Strict TypeScript APIs",
		body: "Typed props, generic tables and forms, and shipped declaration files — autocomplete you can trust.",
	},
	{
		icon: Palette,
		title: "Semantic design tokens",
		body: "Colors, radii, shadows, and spacing flow through --ak-* variables. Theme once, apply everywhere.",
	},
	{
		icon: Moon,
		title: "First-class dark mode",
		body: "Light, dark, and system modes with runtime switching and per-theme token values out of the box.",
	},
	{
		icon: Blocks,
		title: "Reusable primitives",
		body: "Compound components like Tabs, Card, and Accordion compose cleanly instead of locking you into layouts.",
	},
	{
		icon: Package,
		title: "Tree-shakable package",
		body: "One barrel entry, side-effect-free modules, and a single scoped stylesheet. Import only what you render.",
	},
];

const stats = [
	{ value: "60", suffix: "+", label: "Components" },
	{ value: "27", suffix: "", label: "Semantic tokens" },
	{ value: "3", suffix: "", label: "Theme modes" },
];

const catalog = [
	{
		to: "/components/buttons",
		title: "Buttons",
		body: "Variants, intents, sizes, loading states.",
		icon: MousePointerClick,
	},
	{
		to: "/components/primitives",
		title: "Primitives",
		body: "Typography, Stack, Flex, Divider.",
		icon: Type,
	},
	{
		to: "/components/display",
		title: "Display",
		body: "Card, Badge, Tag, Avatar, Alert, Progress.",
		icon: LayoutGrid,
	},
	{
		to: "/components/field-form",
		title: "Field Form",
		body: "Schema-driven forms with validation.",
		icon: ClipboardList,
	},
	{
		to: "/components/rhf-form",
		title: "RHF Form",
		body: "React Hook Form integration.",
		icon: FileCheck,
	},
	{
		to: "/components/inputs",
		title: "Inputs",
		body: "Slider, Combobox, DatePicker, OTP, Upload.",
		icon: SlidersHorizontal,
	},
	{
		to: "/components/table",
		title: "Table",
		body: "Sortable, filterable data table.",
		icon: TableIcon,
	},
	{
		to: "/components/datatable",
		title: "Data Table",
		body: "Typed columns, search, selection.",
		icon: Database,
	},
	{
		to: "/components/navigation",
		title: "Navigation",
		body: "Tabs, Accordion, Breadcrumb, Pagination.",
		icon: Navigation,
	},
	{
		to: "/components/overlays",
		title: "Overlays",
		body: "Tooltip, Popover, Drawer, menus.",
		icon: Layers,
	},
	{
		to: "/components/modals",
		title: "Modals",
		body: "Dialogs and confirmation flows.",
		icon: Square,
	},
	{
		to: "/components/toast",
		title: "Toast",
		body: "Notifications with progress and pause.",
		icon: Bell,
	},
];

const rise = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0 },
};

const staggerParent = {
	hidden: {},
	show: { transition: { staggerChildren: 0.06 } },
};

const marqueeItems = [
	"Buttons",
	"Inputs",
	"Tables",
	"Modals",
	"Toasts",
	"Tabs",
	"Cards",
	"Badges",
	"Avatars",
	"Sliders",
	"Drawers",
	"Tooltips",
	"Forms",
	"Switches",
];

const INSTALL_CMD = "npm install akriti-ui";

function TypeInstall() {
	const reduceMotion = useReducedMotion();
	const [copied, setCopied] = useState(false);
	const [length, setLength] = useState(reduceMotion ? INSTALL_CMD.length : 0);

	useEffect(() => {
		if (reduceMotion) {
			setLength(INSTALL_CMD.length);
			return;
		}
		setLength(0);
		const timer = window.setInterval(() => {
			setLength((prev) => {
				if (prev >= INSTALL_CMD.length) {
					window.clearInterval(timer);
					return prev;
				}
				return prev + 1;
			});
		}, 45);
		return () => window.clearInterval(timer);
	}, [reduceMotion]);

	const copyInstall = async () => {
		try {
			await navigator.clipboard.writeText(INSTALL_CMD);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			setCopied(false);
		}
	};

	return (
		<div className="flex items-center gap-2 self-start rounded-lg border border-border bg-surface px-4 py-2.5 shadow-sm">
			<span className="text-primary" aria-hidden>
				$
			</span>
			<Code aria-label="Install command">{INSTALL_CMD.slice(0, length)}</Code>
			<span
				aria-hidden
				className="inline-block h-4 w-[7px] animate-pulse bg-primary"
			/>
			<button
				type="button"
				onClick={copyInstall}
				aria-label={copied ? "Copied" : "Copy install command"}
				className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
			>
				{copied ? <Check size={14} /> : <Copy size={14} />}
			</button>
		</div>
	);
}

function HeroVisual() {
	const reduceMotion = useReducedMotion();
	const mouseX = useMotionValue(0.5);
	const mouseY = useMotionValue(0.5);
	const cardX = useSpring(useTransform(mouseX, [0, 1], [14, -14]), {
		stiffness: 60,
		damping: 20,
	});
	const cardY = useSpring(useTransform(mouseY, [0, 1], [12, -12]), {
		stiffness: 60,
		damping: 20,
	});
	const chipX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), {
		stiffness: 60,
		damping: 20,
	});
	const chipY = useSpring(useTransform(mouseY, [0, 1], [-16, 16]), {
		stiffness: 60,
		damping: 20,
	});

	return (
		<div
			className="relative mx-auto w-full max-w-md"
			onMouseMove={(event) => {
				if (reduceMotion) return;
				const rect = event.currentTarget.getBoundingClientRect();
				mouseX.set((event.clientX - rect.left) / rect.width);
				mouseY.set((event.clientY - rect.top) / rect.height);
			}}
			onMouseLeave={() => {
				mouseX.set(0.5);
				mouseY.set(0.5);
			}}
		>
			<motion.div style={reduceMotion ? undefined : { x: cardX, y: cardY }}>
				<HeroPreview />
			</motion.div>
			<motion.div
				aria-hidden
				style={reduceMotion ? undefined : { x: chipX, y: chipY }}
				animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
				transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
				className="absolute -top-5 -right-3 hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 shadow-lg sm:flex"
			>
				<span className="flex h-7 w-7 items-center justify-center rounded-full bg-success-subtle text-success">
					<Check size={14} />
				</span>
				<span>
					<span className="block text-xs font-semibold">Deployed</span>
					<span className="block text-xs text-muted-foreground">
						Build #482 live
					</span>
				</span>
			</motion.div>
			<motion.div
				aria-hidden
				style={reduceMotion ? undefined : { x: chipY, y: chipX }}
				animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
				transition={{
					duration: 7,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 1,
				}}
				className="absolute -bottom-6 -left-3 hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 shadow-lg sm:flex"
			>
				<span className="flex -space-x-2">
					{["AL", "GT", "MH"].map((initials) => (
						<span
							key={initials}
							className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-secondary text-[10px] font-semibold text-secondary-foreground"
						>
							{initials}
						</span>
					))}
				</span>
				<span className="text-xs font-medium">+9 online</span>
			</motion.div>
		</div>
	);
}

function HeroPreview() {
	const [alertsOn, setAlertsOn] = useState(true);
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.15 }}
			className="relative mx-auto w-full max-w-md"
		>
			<motion.div
				aria-hidden
				animate={{ y: [0, -10, 0] }}
				transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
				className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
			>
				<div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
					<span className="h-2.5 w-2.5 rounded-full bg-muted" aria-hidden />
					<span className="h-2.5 w-2.5 rounded-full bg-muted" aria-hidden />
					<span className="h-2.5 w-2.5 rounded-full bg-muted" aria-hidden />
					<span className="ml-2 rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
						akriti-ui — preview
					</span>
					<span className="ml-auto">
						<Badge tone="success">Live</Badge>
					</span>
				</div>
				<div className="flex flex-col gap-4 p-5">
					<div className="flex items-center gap-3">
						<Avatar name="Ada Lovelace" />
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium">Ada Lovelace</p>
							<p className="truncate text-xs text-muted-foreground">
								Administrator
							</p>
						</div>
						<Tag tone="info">Beta</Tag>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button size="sm">Save changes</Button>
						<Button size="sm" variant="outline">
							Preview
						</Button>
						<Button size="sm" variant="ghost" intent="danger">
							Delete
						</Button>
					</div>
					<Tabs defaultValue="overview">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="activity">Activity</TabsTrigger>
						</TabsList>
						<TabsContent value="overview">
							<Progress percent={72} intent="success" />
						</TabsContent>
						<TabsContent value="activity">
							<Text size="sm" tone="muted">
								12 deployments this week.
							</Text>
						</TabsContent>
					</Tabs>
					<div className="flex items-center justify-between gap-3 border-t border-border pt-3">
						<Text size="sm">Email notifications</Text>
						<Switch
							aria-label="Email notifications"
							checked={alertsOn}
							onCheckedChange={setAlertsOn}
						/>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

function DemoButtons() {
	return (
		<div className="flex flex-wrap gap-2">
			<Button size="sm">Primary</Button>
			<Button size="sm" variant="secondary">
				Secondary
			</Button>
			<Button size="sm" variant="outline">
				Outline
			</Button>
			<Button size="sm" intent="success">
				Success
			</Button>
			<Button size="sm" intent="danger">
				Danger
			</Button>
		</div>
	);
}

function DemoInputs() {
	return (
		<div className="flex max-w-sm flex-col gap-3">
			<Input
				placeholder="Search components..."
				aria-label="Search components"
			/>
			<Select
				options={[
					{ label: "React", value: "react" },
					{ label: "Vue", value: "vue" },
				]}
				value="react"
				onChange={() => undefined}
				aria-label="Framework"
			/>
			<Switch label="Enable notifications" defaultChecked />
		</div>
	);
}

function DemoDisplay() {
	return (
		<div className="flex flex-col gap-3">
			<Card>
				<CardHeader>
					<CardTitle>Quarterly review</CardTitle>
				</CardHeader>
				<CardContent>
					<Progress percent={80} intent="success" />
				</CardContent>
			</Card>
			<div className="flex flex-wrap items-center gap-2">
				<Badge count={5}>
					<Avatar name="Grace Hopper" size="sm" />
				</Badge>
				<Tag tone="success">On track</Tag>
				<Tag tone="warning">Pending</Tag>
			</div>
		</div>
	);
}

function DemoNavigation() {
	return (
		<Tabs defaultValue="account" className="w-full max-w-sm">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="billing">Billing</TabsTrigger>
				<TabsTrigger value="security">Security</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				<Text size="sm" tone="muted">
					Profile, preferences, and linked accounts live here.
				</Text>
			</TabsContent>
			<TabsContent value="billing">
				<Text size="sm" tone="muted">
					Invoices, plan, and payment methods live here.
				</Text>
			</TabsContent>
			<TabsContent value="security">
				<Text size="sm" tone="muted">
					Sessions and two-factor settings live here.
				</Text>
			</TabsContent>
		</Tabs>
	);
}

const miniRows = [
	{ id: 1, name: "Ada Lovelace", role: "Admin" },
	{ id: 2, name: "Alan Turing", role: "Editor" },
	{ id: 3, name: "Grace Hopper", role: "Viewer" },
];

function DemoTable() {
	return (
		<Table
			showSearch={false}
			pageSize={5}
			data={miniRows}
			columns={[
				{ key: "name", title: "Name", sortable: true },
				{ key: "role", title: "Role", sortable: true },
			]}
		/>
	);
}

function DemoFeedback() {
	const { success } = useToast();
	const [confirmOpen, setConfirmOpen] = useState(false);
	return (
		<div className="flex flex-wrap gap-2">
			<Button
				size="sm"
				intent="success"
				onClick={() =>
					success("Deployed", { description: "Build #482 is live." })
				}
			>
				Send toast
			</Button>
			<Button size="sm" variant="outline" onClick={() => setConfirmOpen(true)}>
				Open dialog
			</Button>
			<Modal
				isOpen={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				title="Publish changes?"
				size="sm"
				onCancel={() => setConfirmOpen(false)}
				onConfirm={() => setConfirmOpen(false)}
				confirmText="Publish"
			>
				<Text size="sm" tone="muted">
					This will deploy the current build to production.
				</Text>
			</Modal>
		</div>
	);
}

const liveDemos: {
	title: string;
	body: string;
	demo: () => React.JSX.Element;
}[] = [
	{
		title: "Buttons",
		body: "Variants, intents, and sizes.",
		demo: DemoButtons,
	},
	{ title: "Inputs", body: "Fields, selects, and toggles.", demo: DemoInputs },
	{
		title: "Display",
		body: "Cards, badges, tags, avatars.",
		demo: DemoDisplay,
	},
	{
		title: "Navigation",
		body: "Tabs with keyboard support.",
		demo: DemoNavigation,
	},
	{ title: "Data", body: "Sortable tables out of the box.", demo: DemoTable },
	{
		title: "Feedback",
		body: "Toasts and dialogs that work.",
		demo: DemoFeedback,
	},
];

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

const themePresets = [
	"#2563eb",
	"#635bff",
	"#9333ea",
	"#0891b2",
	"#16a34a",
	"#dc2626",
];

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
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-background text-foreground">
			<SiteHeader onMenu={() => undefined} />
			<main className="mx-auto max-w-6xl px-4">
				<Stack gap={12}>
					<section className="relative overflow-hidden">
						<div
							aria-hidden
							className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)] dark:opacity-40"
							style={{
								backgroundImage:
									"linear-gradient(var(--ak-border) 1px, transparent 1px), linear-gradient(90deg, var(--ak-border) 1px, transparent 1px)",
								backgroundSize: "44px 44px",
							}}
						/>
						<motion.div
							aria-hidden
							animate={{ x: [0, 30, -16, 0], y: [0, -22, 12, 0] }}
							transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
							className="absolute -top-32 right-[10%] h-80 w-80 rounded-full bg-primary/15 blur-3xl dark:bg-primary/25"
						/>
						<motion.div
							aria-hidden
							animate={{ x: [0, -24, 18, 0], y: [0, 18, -14, 0] }}
							transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
							className="absolute bottom-[-20%] left-[5%] h-80 w-80 rounded-full bg-success/15 blur-3xl dark:bg-success/20"
						/>
						<div className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr]">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.45 }}
							>
								<Stack gap={5}>
									<Badge tone="info">
										<Sparkles size={12} aria-hidden />
										<span className="ml-1">React · TypeScript · Tokens</span>
									</Badge>
									<h1 className="max-w-xl font-display text-4xl font-bold leading-tight">
										Accessible React components,{" "}
										<span className="text-primary">themed in minutes</span>
									</h1>
									<Text tone="muted" size="lg" className="max-w-lg">
										Akriti UI is an open-source component library with semantic
										design tokens, dark mode, and strict TypeScript APIs —
										install it and ship production interfaces today.
									</Text>
									<div className="flex flex-wrap items-center gap-3">
										<Button
											variant="primary"
											onClick={() => navigate("/docs/getting-started")}
										>
											Get Started
											<ArrowRight size={16} aria-hidden />
										</Button>
										<Button
											variant="outline"
											onClick={() => navigate(GITHUB_URL)}
										>
											<Github size={17} aria-hidden />
											{" GitHub"}
										</Button>
										{/* mx-auto max-w-6xl */}
										{/* <a
											href={GITHUB_URL}
											target="_blank"
											rel="noreferrer"
											aria-label="Akriti UI on GitHub"
											className="inline-flex h-10 items-center rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
										></a> */}
									</div>
									<TypeInstall />
									<dl className="flex flex-wrap items-start gap-8 pt-2">
										{stats.map((stat) => (
											<div key={stat.label} className="text-center">
												<dd className="font-display text-2xl font-bold">
													{stat.value}
													{stat.suffix}
												</dd>
												<dt className="text-xs tracking-wider text-muted-foreground uppercase">
													{stat.label}
												</dt>
											</div>
										))}
									</dl>
								</Stack>
							</motion.div>
							<HeroVisual />
						</div>
					</section>

					<section
						aria-hidden
						className="marquee-mask overflow-hidden border-y border-border py-4"
					>
						<div className="animate-ak-marquee flex w-max items-center gap-10">
							{[...marqueeItems, ...marqueeItems].map((name, index) => (
								<span
									key={`${name}-${index}`}
									className="flex items-center gap-10 font-display text-sm font-semibold tracking-wide whitespace-nowrap text-muted-foreground"
								>
									{name}
									<span
										aria-hidden
										className="h-1 w-1 rounded-full bg-primary/50"
									/>
								</span>
							))}
						</div>
					</section>

					<motion.section
						variants={staggerParent}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: "-40px" }}
					>
						<Stack gap={4}>
							<motion.div variants={rise}>
								<Heading level={2}>Why Akriti UI</Heading>
								<Text tone="muted">
									Everything a production interface needs — and nothing it
									doesn&apos;t.
								</Text>
							</motion.div>
							<motion.div
								variants={rise}
								className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
							>
								{whyItems.map((item) => (
									<motion.div key={item.title} variants={rise}>
										<Card className="h-full">
											<CardHeader>
												<span className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
													<item.icon size={18} aria-hidden />
												</span>
												<CardTitle>{item.title}</CardTitle>
												<Text size="sm" tone="muted">
													{item.body}
												</Text>
											</CardHeader>
										</Card>
									</motion.div>
								))}
							</motion.div>
						</Stack>
					</motion.section>

					<motion.section
						variants={staggerParent}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: "-40px" }}
					>
						<Stack gap={4}>
							<motion.div variants={rise}>
								<Heading level={2}>Live component showcase</Heading>
								<Text tone="muted">
									Real, working components — not mockups. Interact with them,
									then open the full guides.
								</Text>
							</motion.div>
							<motion.div
								variants={rise}
								className="grid grid-cols-1 gap-4 lg:grid-cols-2"
							>
								{liveDemos.map((entry) => (
									<motion.div key={entry.title} variants={rise}>
										<Card className="h-full">
											<CardHeader>
												<CardTitle>{entry.title}</CardTitle>
												<Text size="sm" tone="muted">
													{entry.body}
												</Text>
											</CardHeader>
											<CardContent>
												<entry.demo />
											</CardContent>
										</Card>
									</motion.div>
								))}
							</motion.div>
						</Stack>
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
						<Stack gap={4}>
							<motion.div variants={rise}>
								<Heading level={2}>Component catalog</Heading>
								<Text tone="muted">
									Every component below is live — open a page to interact with
									it in both themes.
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
									<Button
										variant="primary"
										onClick={() => navigate("/components/inputs")}
									>
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
										<span className="text-emerald-300">
											{"'akriti-ui/style.css'"}
										</span>
										<span className="text-slate-400">{";"}</span>
										{"\n\n"}
										<span className="text-sky-300">{"<Card>"}</span>
										{"\n"}
										<span className="text-slate-100">{"  <Button "}</span>
										<span className="text-amber-200">{"intent"}</span>
										<span className="text-slate-100">{"="}</span>
										<span className="text-emerald-300">{'"success"'},</span>
										{"\n"}
										<span className="text-slate-100">
											{"  >Save changes</Button>"}
										</span>
										{"\n"}
										<span className="text-sky-300">{"</Card>"}</span>
									</code>
								</pre>
							</div>
						</div>
					</motion.section>

					<motion.section
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.35 }}
					>
						<div className="rounded-2xl border border-primary/25 bg-primary/[0.04] px-6 py-12 text-center sm:px-12 dark:bg-primary/10">
							<Stack gap={4} align="center">
								<Heading level={2}>Start building with Akriti UI</Heading>
								<Text tone="muted" className="max-w-lg">
									Read the five-minute guide, then theme the system to match
									your brand.
								</Text>
								<Stack direction="row" gap={3} justify="center">
									<Button
										variant="primary"
										onClick={() => navigate("/docs/getting-started")}
									>
										Get Started
										<ArrowRight size={16} aria-hidden />
									</Button>
									<Button
										variant="outline"
										onClick={() => navigate("/components")}
									>
										Browse components
									</Button>
								</Stack>
							</Stack>
						</div>
					</motion.section>
				</Stack>
			</main>
			<footer className="border-t border-border">
				<div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<p className="font-display text-base font-bold">Akriti UI</p>
						<p className="mt-2 max-w-xs text-sm text-muted-foreground">
							An accessible, themeable React component library with strict
							TypeScript APIs.
						</p>
					</div>
					<nav aria-label="Product">
						<p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
							Product
						</p>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									to="/components"
									className="text-muted-foreground hover:text-foreground"
								>
									Components
								</Link>
							</li>
							<li>
								<Link
									to="/docs"
									className="text-muted-foreground hover:text-foreground"
								>
									Documentation
								</Link>
							</li>
							<li>
								<Link
									to="/docs/theming"
									className="text-muted-foreground hover:text-foreground"
								>
									Theming
								</Link>
							</li>
						</ul>
					</nav>
					<nav aria-label="Resources">
						<p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
							Resources
						</p>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									to="/docs/getting-started"
									className="text-muted-foreground hover:text-foreground"
								>
									Getting started
								</Link>
							</li>
							<li>
								<a
									href={GITHUB_URL}
									target="_blank"
									rel="noreferrer"
									className="text-muted-foreground hover:text-foreground"
								>
									GitHub repository
								</a>
							</li>
						</ul>
					</nav>
					<div>
						<p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
							Install
						</p>
						<div className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
							<Code>npm install akriti-ui</Code>
						</div>
					</div>
				</div>
				<div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
					© 2026 Akriti UI · MIT License · Built with React and Tailwind CSS
				</div>
			</footer>
		</div>
	);
}
