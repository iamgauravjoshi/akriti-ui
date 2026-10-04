import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = Omit<
  HTMLAttributes<HTMLHRElement>,
  "className" | "style"
> & {
  orientation?: DividerOrientation;
  className?: string;
  style?: CSSProperties;
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = "horizontal", className, style, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        aria-orientation={orientation}
        className={cn(
          "border-border",
          orientation === "horizontal" ? "w-full border-t" : "self-stretch border-l",
          className,
        )}
        style={style}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";
