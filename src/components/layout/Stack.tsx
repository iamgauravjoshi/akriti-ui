import {
  createElement,
  type ComponentPropsWithRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "../../lib/cn";

export type StackDirection = "column" | "row";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

export type StackProps<T extends ElementType = "div"> = {
  as?: T;
  direction?: StackDirection;
  gap?: number;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  ref?: Ref<Element>;
} & Omit<
  ComponentPropsWithRef<T>,
  | "as"
  | "direction"
  | "gap"
  | "align"
  | "justify"
  | "wrap"
  | "className"
  | "style"
  | "children"
  | "ref"
>;

const directionClasses: Record<StackDirection, string> = {
  column: "flex-col",
  row: "flex-row",
};

const alignClasses: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export function Stack<T extends ElementType = "div">({
  as,
  direction = "column",
  gap = 4,
  align,
  justify,
  wrap = false,
  className,
  style,
  children,
  ref,
  ...props
}: StackProps<T>) {
  return createElement(
    as ?? "div",
    {
      ...props,
      ref,
      className: cn(
        "flex",
        directionClasses[direction],
        align && alignClasses[align],
        justify && justifyClasses[justify],
        wrap && "flex-wrap",
        className,
      ),
      style: { gap: `calc(var(--spacing) * ${gap})`, ...style },
    },
    children,
  );
}
