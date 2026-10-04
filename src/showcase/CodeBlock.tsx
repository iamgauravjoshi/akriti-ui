import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export function CodeBlock({
  title,
  children,
  className,
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-[#0f172a] dark:bg-black/40",
        className,
      )}
    >
      {title ? (
        <div className="border-b border-white/10 px-4 py-2 text-xs font-medium text-slate-400">
          {title}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-slate-100">
        <code>{children}</code>
      </pre>
    </div>
  );
}
