import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
};

export type BreadcrumbProps = Omit<
  HTMLAttributes<HTMLElement>,
  "className" | "style"
> & {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, className, style, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={className}
        style={style}
        {...props}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <span aria-hidden className="text-muted-foreground">
                    {separator ?? <ChevronRight size={14} />}
                  </span>
                ) : null}
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? "font-medium text-foreground" : "text-muted-foreground"}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
