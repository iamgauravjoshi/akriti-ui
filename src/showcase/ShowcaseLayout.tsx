import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
  ClipboardList,
  Database,
  FileCheck,
  Home,
  Layers,
  LayoutGrid,
  Menu,
  Moon,
  MousePointerClick,
  Navigation as NavigationIcon,
  SlidersHorizontal,
  Square,
  Sun,
  Table as TableIcon,
  Type,
  type LucideIcon,
} from "lucide-react";
import { Drawer, IconButton, useTheme } from "..";
import { cn } from "../lib/cn";

const SIDEBAR_KEY = "akriti-sidebar-collapsed";
const EXPANDED_WIDTH = 272;
const COLLAPSED_WIDTH = 76;

type RouteMeta = {
  to: string;
  label: string;
  title: string;
  description: string;
  group: string;
  icon: LucideIcon;
  end?: boolean;
};

const routes: RouteMeta[] = [
  {
    to: "/",
    label: "Home",
    title: "Home",
    description: "Overview of the Akriti UI component system.",
    group: "Overview",
    icon: Home,
    end: true,
  },
  {
    to: "/buttons",
    label: "Buttons",
    title: "Buttons",
    description: "Variants, intents, sizes, icons, and loading states.",
    group: "General",
    icon: MousePointerClick,
  },
  {
    to: "/primitives",
    label: "Primitives",
    title: "Primitives",
    description: "Typography, Stack, Flex, Divider, and VisuallyHidden.",
    group: "General",
    icon: Type,
  },
  {
    to: "/form-demo",
    label: "Field Form",
    title: "Field Form",
    description: "Schema-driven forms with validation and async submit.",
    group: "Forms",
    icon: ClipboardList,
  },
  {
    to: "/form-demo-02",
    label: "RHF Form",
    title: "RHF Form",
    description: "React Hook Form integration with accessible fields.",
    group: "Forms",
    icon: FileCheck,
  },
  {
    to: "/entry",
    label: "Inputs",
    title: "Inputs",
    description: "Slider, Combobox, DatePicker, OTP, and Upload.",
    group: "Forms",
    icon: SlidersHorizontal,
  },
  {
    to: "/table",
    label: "Table",
    title: "Table",
    description: "Sortable, filterable table with selection.",
    group: "Display",
    icon: TableIcon,
  },
  {
    to: "/datatable",
    label: "Data Table",
    title: "Data Table",
    description: "Typed accessor columns, search, and selection.",
    group: "Display",
    icon: Database,
  },
  {
    to: "/display",
    label: "Display",
    title: "Display",
    description: "Card, Badge, Tag, Avatar, Alert, Progress, and Empty.",
    group: "Display",
    icon: LayoutGrid,
  },
  {
    to: "/navigation",
    label: "Navigation",
    title: "Navigation",
    description: "Tabs, Accordion, Breadcrumb, and Pagination.",
    group: "Navigation",
    icon: NavigationIcon,
  },
  {
    to: "/modals",
    label: "Modals",
    title: "Modals",
    description: "Dialogs and confirmation flows.",
    group: "Overlays",
    icon: Square,
  },
  {
    to: "/overlays",
    label: "Overlays",
    title: "Overlays",
    description: "Tooltip, Popover, Drawer, and dropdown menus.",
    group: "Overlays",
    icon: Layers,
  },
  {
    to: "/toast",
    label: "Toast",
    title: "Toast",
    description: "Notifications with progress, pause, and positions.",
    group: "Feedback",
    icon: Bell,
  },
];

const groups = [...new Set(routes.map((route) => route.group))];

function NavGroups({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-6" aria-label="Component sections">
      {groups.map((group) => (
        <div key={group}>
          {collapsed ? (
            <div
              aria-hidden
              className="mx-auto mb-2 h-px w-8 bg-border"
            />
          ) : (
            <p className="mb-2 px-3 text-[11px] font-bold tracking-[0.18em] text-muted-foreground/80 uppercase">
              {group}
            </p>
          )}
          <ul className="flex flex-col gap-1">
            {routes
              .filter((route) => route.group === group)
              .map((route) => (
                <li key={route.to}>
                  <NavLink
                    to={route.to}
                    end={route.end}
                    onClick={onNavigate}
                    title={collapsed ? route.label : undefined}
                    className={({ isActive }) =>
                      cn(
                        "relative flex items-center gap-2.5 rounded-xl text-sm font-medium transition-colors",
                        collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <motion.span
                            layoutId="side-nav-active"
                            aria-hidden
                            className="absolute inset-0 rounded-xl bg-primary/10"
                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                          />
                        ) : null}
                        <route.icon
                          size={17}
                          aria-hidden
                          className="relative shrink-0"
                        />
                        {collapsed ? null : (
                          <span className="relative truncate">{route.label}</span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-2.5")}>
      <motion.span
        aria-hidden
        layout
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-base font-bold text-primary-foreground"
      >
        A
      </motion.span>
      {collapsed ? null : (
        <span>
          <span className="block font-display text-base font-bold leading-none">
            Akriti UI
          </span>
          <span className="mt-1 block text-xs leading-none text-muted-foreground">
            v0.1.0 · pre-release
          </span>
        </span>
      )}
    </div>
  );
}

function readCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SIDEBAR_KEY) === "1";
}

export function ShowcaseLayout() {
  const { resolvedTheme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const meta = routes.find((route) => pathname === route.to);
  const isHome = pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      window.localStorage.setItem(SIDEBAR_KEY, prev ? "0" : "1");
      return !prev;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="fixed inset-y-0 left-0 z-40 flex-col overflow-hidden border-r border-border bg-surface max-lg:hidden lg:flex"
      >
        <div className={cn("border-b border-border py-4", collapsed ? "px-0" : "px-5")}>
          <div className={cn(collapsed && "flex justify-center")}>
            <Brand collapsed={collapsed} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          <NavGroups collapsed={collapsed} />
        </div>
        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            aria-expanded={!collapsed}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {collapsed ? (
              <ChevronsRight size={17} aria-hidden className="mx-auto shrink-0" />
            ) : (
              <>
                <ChevronsLeft size={17} aria-hidden className="shrink-0" />
                <span className="truncate">Collapse</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>

      <motion.div
        initial={false}
        animate={{ paddingLeft: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="max-lg:p-0!"
      >
        <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="lg:hidden">
                <IconButton
                  aria-label="Open navigation"
                  variant="outline"
                  size="sm"
                  onClick={() => setMenuOpen(true)}
                >
                  <Menu size={16} />
                </IconButton>
              </span>
              <span className="lg:hidden">
                <Brand />
              </span>
            </div>
            <IconButton
              aria-label="Toggle color theme"
              variant="outline"
              size="sm"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </IconButton>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">
          {!isHome && meta ? (
            <motion.div
              key={`header-${meta.to}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-8"
            >
              <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                {meta.group}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold">
                {meta.title}
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {meta.description}
              </p>
            </motion.div>
          ) : null}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
          Akriti UI component showcase — import from{" "}
          <code className="rounded bg-muted px-1 py-0.5">akriti-ui</code>.
        </footer>
      </motion.div>

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        side="left"
        title="Browse components"
      >
        <NavGroups onNavigate={() => setMenuOpen(false)} />
      </Drawer>
    </div>
  );
}
