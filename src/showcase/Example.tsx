import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export type ExampleProps = {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * One documented demo section: an `h2` heading plus a live preview
 * surface. Page-level `h1` titles come from the showcase layout —
 * demos must not render their own.
 */
export function Example({ title, description, children, className }: ExampleProps) {
  return (
    <section className={cn("scroll-mt-24", className)}>
      {title || description ? (
        <div className="mb-3">
          {title ? (
            <h2 className="font-display text-lg font-semibold">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
        {children}
      </div>
    </section>
  );
}
