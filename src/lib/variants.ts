import type { SemanticIntent } from "../types/common";

export function resolveIntent(intent: SemanticIntent = "default"): Exclude<
  SemanticIntent,
  "error"
> {
  return intent === "error" ? "danger" : intent;
}

export const fieldSizeClasses = {
  xs: "h-7 px-2 text-xs",
  sm: "h-8 px-2.5 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-11 px-3.5 text-base",
  xl: "h-12 px-4 text-base",
} as const;

export const fieldChrome = (error?: boolean) =>
  [
    "w-full rounded-md border bg-surface text-foreground shadow-sm transition-colors",
    "placeholder:text-muted-foreground",
    "focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
    error
      ? "border-danger focus-visible:border-danger"
      : "border-border hover:border-foreground/20 focus-visible:border-focus",
  ].join(" ");
