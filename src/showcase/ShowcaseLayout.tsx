import { NavLink, Outlet } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { IconButton, useTheme } from "..";
import { cn } from "../lib/cn";

const links = [
  { to: "/", label: "Buttons" },
  { to: "/modals", label: "Modals" },
  { to: "/table", label: "Table" },
  { to: "/form-demo", label: "Field Form" },
  { to: "/form-demo-02", label: "RHF Form" },
  { to: "/toast", label: "Toast" },
];

export function ShowcaseLayout() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Akriti UI</p>
            <p className="text-xs text-muted-foreground">Component showcase</p>
          </div>
          <nav className="flex flex-wrap items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-1.5 text-sm",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
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
        <Outlet />
      </main>
      <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
        Import components from the public <code>src/index.ts</code> barrel. Toggle theme from
        the header.
      </footer>
    </div>
  );
}
