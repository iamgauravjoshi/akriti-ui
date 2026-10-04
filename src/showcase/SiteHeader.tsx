import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Github, Menu, Moon, Search, Sun } from "lucide-react";
import { IconButton, useTheme } from "..";
import { cn } from "../lib/cn";
import { GITHUB_URL } from "./site";
import { SearchPalette } from "./SearchPalette";

const tabs = [
  { to: "/", label: "Home", end: true },
  { to: "/components", label: "Components" },
  { to: "/docs", label: "Docs" },
];

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Akriti UI home">
      <span
        aria-hidden
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-base font-bold text-primary-foreground"
      >
        A
      </span>
      <span className="hidden sm:block">
        <span className="block font-display text-base font-bold leading-none">
          Akriti UI
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader({ onMenu }: { onMenu: () => void }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const onComponentsPage = pathname.startsWith("/components");
  const onDocsPage = pathname.startsWith("/docs");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="flex items-center gap-2 px-4 py-3">
          {(onComponentsPage || onDocsPage) && (
            <span className="lg:hidden">
              <IconButton
                aria-label="Open navigation"
                variant="outline"
                size="sm"
                onClick={onMenu}
              >
                <Menu size={16} />
              </IconButton>
            </span>
          )}
          <Brand />
          <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 md:flex">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search components and docs"
              className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <Search size={14} aria-hidden />
              <span className="hidden lg:inline">Search…</span>
              <kbd className="hidden rounded border border-border bg-muted px-1 font-mono text-xs lg:inline">
                ⌘K
              </kbd>
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Akriti UI on GitHub"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Github size={17} aria-hidden />
            </a>
            <IconButton
              aria-label="Toggle color theme"
              variant="outline"
              size="sm"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </IconButton>
          </div>
        </div>
      </header>
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
