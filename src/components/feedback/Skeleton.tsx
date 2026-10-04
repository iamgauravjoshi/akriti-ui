import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";

export type SkeletonProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "className" | "style" | "children"
> & {
  className?: string;
  style?: CSSProperties;
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn("animate-pulse rounded-md bg-muted", className)}
        style={style}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
