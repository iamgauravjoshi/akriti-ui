import {
  createElement,
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type JSX,
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

export type StackProps = Omit<
  HTMLAttributes<HTMLElement>,
  "className" | "style"
> & {
  as?: keyof JSX.IntrinsicElements;
  direction?: StackDirection;
  gap?: number;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  className?: string;
  style?: CSSProperties;
};

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

export const Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      as = "div",
      direction = "column",
      gap = 4,
      align,
      justify,
      wrap = false,
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
  },
);

Stack.displayName = "Stack";
