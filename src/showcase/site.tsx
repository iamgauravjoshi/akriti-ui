import {
  Bell,
  BookOpen,
  ClipboardList,
  Database,
  FileCheck,
  Home,
  Layers,
  LayoutGrid,
  MousePointerClick,
  Navigation as NavigationIcon,
  Palette,
  Rocket,
  SlidersHorizontal,
  Square,
  Table as TableIcon,
  Type,
  type LucideIcon,
} from "lucide-react";

export const GITHUB_URL = "https://github.com/iamgauravjoshi/akriti-ui";

export type SiteSection = "components" | "docs";

export type SiteRoute = {
  to: string;
  label: string;
  title: string;
  description: string;
  group: string;
  icon: LucideIcon;
  section: SiteSection;
  keywords?: string;
  end?: boolean;
};

export const siteRoutes: SiteRoute[] = [
  {
    to: "/components",
    label: "Overview",
    title: "Components",
    description: "Browse every component with live, interactive demos.",
    group: "Overview",
    icon: LayoutGrid,
    section: "components",
    end: true,
    keywords: "components overview catalog all",
  },
  {
    to: "/components/buttons",
    label: "Buttons",
    title: "Buttons",
    description: "Variants, intents, sizes, icons, and loading states.",
    group: "General",
    icon: MousePointerClick,
    section: "components",
    keywords: "button icon close switch toggle click",
  },
  {
    to: "/components/primitives",
    label: "Primitives",
    title: "Primitives",
    description: "Typography, Stack, Flex, Divider, and VisuallyHidden.",
    group: "General",
    icon: Type,
    section: "components",
    keywords: "text heading code kbd stack flex divider layout typography",
  },
  {
    to: "/components/field-form",
    label: "Field Form",
    title: "Field Form",
    description: "Schema-driven forms with validation and async submit.",
    group: "Forms",
    icon: ClipboardList,
    section: "components",
    keywords: "form validation input schema submit",
  },
  {
    to: "/components/rhf-form",
    label: "RHF Form",
    title: "RHF Form",
    description: "React Hook Form integration with accessible fields.",
    group: "Forms",
    icon: FileCheck,
    section: "components",
    keywords: "react hook form zod controller validation",
  },
  {
    to: "/components/inputs",
    label: "Inputs",
    title: "Inputs",
    description: "Slider, Combobox, DatePicker, OTP, and Upload.",
    group: "Forms",
    icon: SlidersHorizontal,
    section: "components",
    keywords: "slider combobox date picker otp upload file calendar",
  },
  {
    to: "/components/table",
    label: "Table",
    title: "Table",
    description: "Sortable, filterable table with selection.",
    group: "Display",
    icon: TableIcon,
    section: "components",
    keywords: "table sort filter search select paginate rows",
  },
  {
    to: "/components/data-table",
    label: "Data Table",
    title: "Data Table",
    description: "Typed accessor columns, search, and selection.",
    group: "Display",
    icon: Database,
    section: "components",
    keywords: "datatable typed columns accessor search select",
  },
  {
    to: "/components/display",
    label: "Display",
    title: "Display",
    description: "Card, Badge, Tag, Avatar, Alert, Progress, and Empty.",
    group: "Display",
    icon: LayoutGrid,
    section: "components",
    keywords: "card badge tag avatar alert progress skeleton empty",
  },
  {
    to: "/components/navigation",
    label: "Navigation",
    title: "Navigation",
    description: "Tabs, Accordion, Breadcrumb, and Pagination.",
    group: "Navigation",
    icon: NavigationIcon,
    section: "components",
    keywords: "tabs accordion breadcrumb pagination menu",
  },
  {
    to: "/components/modals",
    label: "Modals",
    title: "Modals",
    description: "Dialogs and confirmation flows.",
    group: "Overlays",
    icon: Square,
    section: "components",
    keywords: "modal dialog confirm overlay popup",
  },
  {
    to: "/components/overlays",
    label: "Overlays",
    title: "Overlays",
    description: "Tooltip, Popover, Drawer, and dropdown menus.",
    group: "Overlays",
    icon: Layers,
    section: "components",
    keywords: "tooltip popover drawer dropdown menu overlay",
  },
  {
    to: "/components/toast",
    label: "Toast",
    title: "Toast",
    description: "Notifications with progress, pause, and positions.",
    group: "Feedback",
    icon: Bell,
    section: "components",
    keywords: "toast notification message alert",
  },
  {
    to: "/docs",
    label: "Overview",
    title: "Documentation",
    description: "What Akriti UI is and how this guide is organized.",
    group: "Guides",
    icon: BookOpen,
    section: "docs",
    end: true,
    keywords: "docs guide overview start",
  },
  {
    to: "/docs/getting-started",
    label: "Getting Started",
    title: "Getting Started",
    description: "Install the package and render your first component.",
    group: "Guides",
    icon: Rocket,
    section: "docs",
    keywords: "install setup quickstart usage import css",
  },
  {
    to: "/docs/theming",
    label: "Theming",
    title: "Theming",
    description: "Tokens, dark mode, and custom themes.",
    group: "Guides",
    icon: Palette,
    section: "docs",
    keywords: "theme tokens dark mode custom colors radius",
  },
];

export const homeRoute: Omit<SiteRoute, "section" | "group" | "icon"> & {
  icon: LucideIcon;
} = {
  to: "/",
  label: "Home",
  title: "Home",
  description: "Overview of the Akriti UI component system.",
  icon: Home,
  end: true,
};

export function groupsFor(section: SiteSection): string[] {
  return [
    ...new Set(
      siteRoutes.filter((route) => route.section === section).map((route) => route.group),
    ),
  ];
}

export function routesFor(section: SiteSection): SiteRoute[] {
  return siteRoutes.filter((route) => route.section === section);
}
