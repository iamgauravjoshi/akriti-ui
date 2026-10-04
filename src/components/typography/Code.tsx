import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";

export type CodeProps = Omit<
  HTMLAttributes<HTMLElement>,
  "className" | "style"
> & {
  className?: string;
  style?: CSSProperties;
};

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          "rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </code>
    );
  },
);

Code.displayName = "Code";
