import {
  createElement,
  type ComponentPropsWithRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
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

export type TextProps<T extends ElementType = "span"> = {
  as?: T;
  size?: TextSize;
  tone?: TextTone;
  truncate?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  ref?: Ref<Element>;
} & Omit<
  ComponentPropsWithRef<T>,
  | "as"
  | "size"
  | "tone"
  | "truncate"
  | "className"
  | "style"
  | "children"
  | "ref"
>;

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

export function Text<T extends ElementType = "span">({
  as,
  size = "md",
  tone = "default",
  truncate = false,
  className,
  style,
  children,
  ref,
  ...props
}: TextProps<T>) {
  return createElement(
    as ?? "span",
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
}
