import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Drawer } from "..";
import { cn } from "../lib/cn";
import { SiteHeader } from "./SiteHeader";
import { groupsFor, routesFor, type SiteSection } from "./site";

const SIDEBAR_KEY = "akriti-sidebar-collapsed";
const EXPANDED_WIDTH = 272;
const COLLAPSED_WIDTH = 76;

function SectionNav({
  section,
  collapsed,
  onNavigate,
}: {
  section: SiteSection;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const groups = groupsFor(section);
  const routes = routesFor(section);
  return (
    <nav className="flex flex-col gap-6" aria-label="Section navigation">
      {groups.map((group) => (
        <div key={group}>
          {collapsed ? (
            <div aria-hidden className="mx-auto mb-2 h-px w-8 bg-border" />
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
                            layoutId="section-nav-active"
                            aria-hidden
                            className="absolute inset-0 rounded-xl bg-primary/10"
                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                          />
                        ) : null}
                        <route.icon size={17} aria-hidden className="relative shrink-0" />
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

function readCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SIDEBAR_KEY) === "1";
}

export function ShowcaseLayout() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const section: SiteSection = pathname.startsWith("/docs") ? "docs" : "components";
  const meta = [...routesFor("components"), ...routesFor("docs")].find(
    (route) => pathname === route.to,
  );

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
      <SiteHeader onMenu={() => setMenuOpen(true)} />

      <div className="mx-auto flex max-w-7xl items-start">
        <motion.aside
          initial={false}
          animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          className="sticky top-[57px] hidden h-[calc(100vh-57px)] shrink-0 flex-col overflow-hidden border-r border-border bg-background max-lg:hidden lg:flex"
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-5">
            <SectionNav section={section} collapsed={collapsed} />
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

        <div className="min-w-0 flex-1">
          <main className="mx-auto max-w-4xl px-4 py-10 sm:px-8">
            {meta ? (
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
        </div>
      </div>

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        side="left"
        title="Browse"
      >
        <SectionNav section={section} onNavigate={() => setMenuOpen(false)} />
      </Drawer>
    </div>
  );
}
