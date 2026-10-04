import {
  forwardRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

export type PaginationProps = Omit<
  HTMLAttributes<HTMLElement>,
  "className" | "style"
> & {
  page?: number;
  defaultPage?: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  className?: string;
  style?: CSSProperties;
};

type PageToken = number | "ellipsis-start" | "ellipsis-end";

function pageTokens(page: number, pageCount: number, siblingCount: number): PageToken[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const start = Math.max(2, page - siblingCount);
  const end = Math.min(pageCount - 1, page + siblingCount);
  const tokens: PageToken[] = [1];
  if (start > 2) tokens.push("ellipsis-start");
  for (let i = start; i <= end; i++) tokens.push(i);
  if (end < pageCount - 1) tokens.push("ellipsis-end");
  tokens.push(pageCount);
  return tokens;
}

const pageButton =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page: controlledPage,
      defaultPage = 1,
      pageCount,
      onPageChange,
      siblingCount = 1,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
    const rawPage = controlledPage ?? uncontrolledPage;
    const page = Math.min(Math.max(1, rawPage), Math.max(1, pageCount));

    const goTo = (next: number) => {
      const clamped = Math.min(pageCount, Math.max(1, next));
      if (controlledPage === undefined) setUncontrolledPage(clamped);
      onPageChange?.(clamped);
    };

    if (pageCount < 1) return null;

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("flex items-center gap-1", className)}
        style={style}
        {...props}
      >
        <button
          type="button"
          aria-label="Go to previous page"
          disabled={page <= 1}
          onClick={() => goTo(page - 1)}
          className={cn(pageButton, "text-muted-foreground")}
        >
          <ChevronLeft size={16} />
        </button>
        {pageTokens(page, pageCount, siblingCount).map((token) =>
          typeof token === "number" ? (
            <button
              key={token}
              type="button"
              aria-label={`Go to page ${token}`}
              aria-current={token === page ? "page" : undefined}
              onClick={() => goTo(token)}
              className={cn(
                pageButton,
                token === page
                  ? "bg-primary font-medium text-primary-foreground"
                  : "text-foreground",
              )}
            >
              {token}
            </button>
          ) : (
            <span key={token} aria-hidden className="px-1 text-muted-foreground">
              …
            </span>
          ),
        )}
        <button
          type="button"
          aria-label="Go to next page"
          disabled={page >= pageCount}
          onClick={() => goTo(page + 1)}
          className={cn(pageButton, "text-muted-foreground")}
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
