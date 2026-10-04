import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";

export type KbdProps = Omit<
  HTMLAttributes<HTMLElement>,
  "className" | "style"
> & {
  className?: string;
  style?: CSSProperties;
};

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground",
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </kbd>
    );
  },
);

Kbd.displayName = "Kbd";
