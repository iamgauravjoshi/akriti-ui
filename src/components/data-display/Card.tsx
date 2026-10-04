import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";

type DivProps = Omit<HTMLAttributes<HTMLDivElement>, "className" | "style"> & {
  className?: string;
  style?: CSSProperties;
};

export const Card = forwardRef<HTMLDivElement, DivProps>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-surface text-foreground shadow-sm",
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  ),
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, DivProps>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, DivProps>(
  ({ className, style, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-none", className)}
      style={style}
      {...props}
    >
      {children}
    </h3>
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, DivProps>(
  ({ className, style, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      style={style}
      {...props}
    >
      {children}
    </p>
  ),
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, DivProps>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, DivProps>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  ),
);
CardFooter.displayName = "CardFooter";
