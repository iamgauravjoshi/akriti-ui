import {
  forwardRef,
  type ComponentProps,
  type CSSProperties,
} from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/cn";

export type TabsProps = ComponentProps<typeof TabsPrimitive.Root> & {
  className?: string;
  style?: CSSProperties;
};

export function Tabs({ className, style, children, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      className={cn("flex flex-col gap-2", className)}
      style={style}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  );
}

export type TabsListProps = ComponentProps<typeof TabsPrimitive.List>;

export const TabsList = forwardRef<
  HTMLDivElement,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 self-start rounded-lg bg-muted p-1",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger>;

export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors",
      "hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:outline-none",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content>;

export const TabsContent = forwardRef<
  HTMLDivElement,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
