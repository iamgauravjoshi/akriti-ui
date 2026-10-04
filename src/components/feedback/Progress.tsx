import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";
import { resolveIntent } from "../../lib/variants";
import type { SemanticIntent } from "../../types/common";

export type ProgressProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "className" | "style" | "children"
> & {
  percent: number;
  intent?: SemanticIntent;
  showLabel?: boolean;
  className?: string;
  style?: CSSProperties;
};

const barClasses: Record<Exclude<SemanticIntent, "error">, string> = {
  default: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ percent, intent = "default", showLabel = true, className, style, ...props }, ref) => {
    const clamped = Math.min(100, Math.max(0, percent));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("flex items-center gap-2", className)}
        style={style}
        {...props}
      >
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", barClasses[resolveIntent(intent)])}
            style={{ width: `${clamped}%` }}
          />
        </div>
        {showLabel ? (
          <span className="text-xs text-muted-foreground">{clamped}%</span>
        ) : null}
      </div>
    );
  },
);

Progress.displayName = "Progress";
