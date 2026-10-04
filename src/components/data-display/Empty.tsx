import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Inbox } from "lucide-react";
import { cn } from "../../lib/cn";

export type EmptyProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> & {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      title = "No data",
      description,
      icon = <Inbox size={32} />,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-2 py-8 text-center",
          className,
        )}
        style={style}
        {...props}
      >
        <span className="text-muted-foreground" aria-hidden>
          {icon}
        </span>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
        {children}
      </div>
    );
  },
);

Empty.displayName = "Empty";
