import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";

export type VisuallyHiddenProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
> & {
  className?: string;
  style?: CSSProperties;
};

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, style, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("sr-only", className)} style={style} {...props}>
        {children}
      </span>
    );
  },
);

VisuallyHidden.displayName = "VisuallyHidden";
