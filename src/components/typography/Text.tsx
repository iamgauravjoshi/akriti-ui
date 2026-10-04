import {
  createElement,
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type JSX,
} from "react";
import { cn } from "../../lib/cn";

export type TextTone =
  | "default"
  | "muted"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

export type TextProps = Omit<
  HTMLAttributes<HTMLElement>,
  "className" | "style"
> & {
  as?: keyof JSX.IntrinsicElements;
  size?: TextSize;
  tone?: TextTone;
  truncate?: boolean;
  className?: string;
  style?: CSSProperties;
};

const sizeClasses: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const toneClasses: Record<TextTone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = "span",
      size = "md",
      tone = "default",
      truncate = false,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    return createElement(
      as,
      {
        ...props,
        ref,
        className: cn(
          sizeClasses[size],
          toneClasses[tone],
          truncate && "truncate",
          className,
        ),
        style,
      },
      children,
    );
  },
);

Text.displayName = "Text";
