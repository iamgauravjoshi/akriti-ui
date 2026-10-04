import {
  forwardRef,
  type ComponentProps,
  type CSSProperties,
} from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

export type AccordionProps =
  | (Omit<
      ComponentProps<typeof AccordionPrimitive.Root>,
      | "type"
      | "value"
      | "defaultValue"
      | "onValueChange"
      | "className"
      | "style"
    > & {
      type?: "single";
      collapsible?: boolean;
      defaultValue?: string;
      value?: string;
      onValueChange?: (value: string) => void;
      className?: string;
      style?: CSSProperties;
    })
  | (Omit<
      ComponentProps<typeof AccordionPrimitive.Root>,
      | "type"
      | "value"
      | "defaultValue"
      | "onValueChange"
      | "className"
      | "style"
    > & {
      type: "multiple";
      defaultValue?: string[];
      value?: string[];
      onValueChange?: (value: string[]) => void;
      className?: string;
      style?: CSSProperties;
    });

export function Accordion(props: AccordionProps) {
  const { className, style, children, ...rest } = props;
  return (
    <AccordionPrimitive.Root
      className={cn("w-full", className)}
      style={style}
      {...(rest as ComponentProps<typeof AccordionPrimitive.Root>)}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

export type AccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item>;

export const AccordionItem = forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-border last:border-b-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export type AccordionTriggerProps = ComponentProps<
  typeof AccordionPrimitive.Trigger
>;

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-2 py-4 text-left text-sm font-medium text-foreground",
        "hover:underline focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:outline-none",
        "[&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        size={16}
        aria-hidden
        className="shrink-0 text-muted-foreground transition-transform"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = ComponentProps<
  typeof AccordionPrimitive.Content
>;

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-muted-foreground",
      "data-[state=closed]:animate-none",
      className,
    )}
    {...props}
  >
    <div className="pt-0 pb-4">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
