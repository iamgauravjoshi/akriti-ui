import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5;

export type HeadingProps = Omit<
  HTMLAttributes<HTMLHeadingElement>,
  "className" | "style"
> & {
  level?: HeadingLevel;
  className?: string;
  style?: CSSProperties;
};

const elements: Record<HeadingLevel, "h1" | "h2" | "h3" | "h4" | "h5"> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
};

const sizeClasses: Record<HeadingLevel, string> = {
  1: "text-4xl",
  2: "text-2xl",
  3: "text-xl",
  4: "text-lg",
  5: "text-base",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, className, style, children, ...props }, ref) => {
    const Tag = elements[level];
    return (
      <Tag
        ref={ref}
        className={cn(
          "font-semibold tracking-tight text-foreground",
          sizeClasses[level],
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Heading.displayName = "Heading";
