import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

export type BadgeTone = "default" | "success" | "warning" | "danger" | "info";

export type BadgeProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
> & {
  count?: ReactNode;
  max?: number;
  dot?: boolean;
  tone?: BadgeTone;
  showZero?: boolean;
  className?: string;
  style?: CSSProperties;
};

const toneClasses: Record<BadgeTone, string> = {
  default: "bg-primary text-primary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-danger text-danger-foreground",
  info: "bg-info text-info-foreground",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      count,
      max = 99,
      dot = false,
      tone = "default",
      showZero = false,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const numeric = typeof count === "number" ? count : null;
    const display =
      numeric !== null && numeric > max ? `${max}+` : (count ?? null);
    const visible = dot || (display !== null && (numeric !== 0 || showZero));

    return (
      <span ref={ref} className={cn("relative inline-flex", className)} style={style} {...props}>
        {children}
        {visible ? (
          <span
            className={cn(
              "absolute -top-2 -right-2 flex items-center justify-center rounded-full text-xs font-medium",
              dot ? "h-2 w-2 p-0" : "h-5 min-w-5 px-1",
              toneClasses[tone],
            )}
          >
            {dot ? null : display}
          </span>
        ) : null}
      </span>
    );
  },
);

Badge.displayName = "Badge";
