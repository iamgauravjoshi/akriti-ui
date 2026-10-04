import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { Drawer, IconButton, useTheme } from "..";
import { cn } from "../lib/cn";

type RouteMeta = {
  to: string;
  label: string;
  title: string;
  description: string;
  group: string;
  end?: boolean;
};

const routes: RouteMeta[] = [
  {
    to: "/",
    label: "Home",
    title: "Home",
    description: "Overview of the Akriti UI component system.",
    group: "Overview",
    end: true,
  },
  {
    to: "/buttons",
    label: "Buttons",
    title: "Buttons",
    description: "Variants, intents, sizes, icons, and loading states.",
    group: "General",
  },
  {
    to: "/primitives",
    label: "Primitives",
    title: "Primitives",
    description: "Typography, Stack, Flex, Divider, and VisuallyHidden.",
    group: "General",
  },
  {
    to: "/form-demo",
    label: "Field Form",
    title: "Field Form",
    description: "Schema-driven forms with validation and async submit.",
    group: "Forms",
  },
  {
    to: "/form-demo-02",
    label: "RHF Form",
    title: "RHF Form",
    description: "React Hook Form integration with accessible fields.",
    group: "Forms",
  },
  {
    to: "/entry",
    label: "Inputs",
    title: "Inputs",
    description: "Slider, Combobox, DatePicker, OTP, and Upload.",
    group: "Forms",
  },
  {
    to: "/table",
    label: "Table",
    title: "Table",
    description: "Sortable, filterable table with selection.",
    group: "Display",
  },
  {
    to: "/datatable",
    label: "Data Table",
    title: "Data Table",
    description: "Typed accessor columns, search, and selection.",
    group: "Display",
  },
  {
    to: "/display",
    label: "Display",
    title: "Display",
    description: "Card, Badge, Tag, Avatar, Alert, Progress, and Empty.",
    group: "Display",
  },
  {
    to: "/navigation",
    label: "Navigation",
    title: "Navigation",
    description: "Tabs, Accordion, Breadcrumb, and Pagination.",
    group: "Navigation",
  },
  {
    to: "/modals",
    label: "Modals",
    title: "Modals",
    description: "Dialogs and confirmation flows.",
    group: "Overlays",
  },
  {
    to: "/overlays",
    label: "Overlays",
    title: "Overlays",
    description: "Tooltip, Popover, Drawer, and dropdown menus.",
    group: "Overlays",
  },
  {
    to: "/toast",
    label: "Toast",
    title: "Toast",
    description: "Notifications with progress, pause, and positions.",
    group: "Feedback",
  },
];

const groups = [...new Set(routes.map((route) => route.group))];

function NavGroups({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-5" aria-label="Component sections">
      {groups.map((group) => (
        <div key={group}>
          <p className="mb-1.5 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {group}
          </p>
          <ul className="flex flex-col gap-0.5">
            {routes
              .filter((route) => route.group === group)
              .map((route) => (
                <li key={route.to}>
                  <NavLink
                    to={route.to}
                    end={route.end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )
                    }
                  >
                    {route.label}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-base font-bold text-primary-foreground"
      >
        A
      </span>
      <span>
        <span className="block font-display text-base font-bold leading-none">
          Akriti UI
        </span>
        <span className="mt-1 block text-xs leading-none text-muted-foreground">
          v0.1.0 · pre-release
        </span>
      </span>
    </div>
  );
}

export function ShowcaseLayout() {
  const { resolvedTheme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const meta = routes.find((route) => pathname === route.to);
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 w-68 shrink-0 flex-col border-r border-border bg-surface max-lg:hidden lg:flex">
        <div className="border-b border-border px-5 py-4">
          <Brand />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavGroups />
        </div>
        <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
          Light / dark follows your system.
        </div>
      </aside>

      <div className="lg:pl-68">
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
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                {meta.group}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold">
                {meta.title}
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {meta.description}
              </p>
            </div>
          ) : null}
          <Outlet />
        </main>

        <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
          Akriti UI component showcase — import from{" "}
          <code className="rounded bg-muted px-1 py-0.5">akriti-ui</code>.
        </footer>
      </div>

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
