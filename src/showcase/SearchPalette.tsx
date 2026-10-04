import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { homeRoute, siteRoutes, type SiteRoute } from "./site";
import { cn } from "../lib/cn";

const index: SiteRoute[] = [
  { ...homeRoute, group: "Overview", section: "components", keywords: "home landing" },
  ...siteRoutes,
];

export function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = "site-search-listbox";

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return index;
    return index.filter((route) =>
      `${route.label} ${route.title} ${route.description} ${route.group} ${route.keywords ?? ""}`
        .toLowerCase()
        .includes(term),
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlighted(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open ]);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  const go = (route: SiteRoute) => {
    onClose();
    navigate(route.to);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[var(--ak-z-toast)] bg-overlay backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation and components"
            className="mx-auto mt-24 w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
          >
            <div className="flex items-center gap-2 border-b border-border px-4">
              <Search size={16} className="shrink-0 text-muted-foreground" aria-hidden />
              <input
                ref={inputRef}
                type="search"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={
                  results.length > 0 ? `site-search-option-${highlighted}` : undefined
                }
                placeholder="Search components and docs..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setHighlighted((prev) =>
                      results.length > 0 ? (prev + 1) % results.length : 0,
                    );
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setHighlighted((prev) =>
                      results.length > 0
                        ? (prev - 1 + results.length) % results.length
                        : 0,
                    );
                  } else if (event.key === "Enter") {
                    if (results[highlighted]) go(results[highlighted]);
                  } else if (event.key === "Escape") {
                    onClose();
                  }
                }}
                className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground sm:block">
                esc
              </kbd>
            </div>
            <div id={listId} role="listbox" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No matches for “{query}”.
                </p>
              ) : (
                results.map((route, position) => (
                  <button
                    key={route.to}
                    id={`site-search-option-${position}`}
                    role="option"
                    aria-selected={position === highlighted}
                    type="button"
                    onMouseEnter={() => setHighlighted(position)}
                    onClick={() => go(route)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left",
                      position === highlighted && "bg-muted",
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <route.icon size={16} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {route.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {route.group} · {route.description}
                      </span>
                    </span>
                    <ArrowRight
                      size={14}
                      aria-hidden
                      className="shrink-0 text-muted-foreground"
                    />
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
