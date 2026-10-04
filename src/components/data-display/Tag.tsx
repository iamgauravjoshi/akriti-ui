import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

export type TagTone = "default" | "success" | "warning" | "danger" | "info";

export type TagProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
> & {
  tone?: TagTone;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
};

const toneClasses: Record<TagTone, string> = {
  default: "bg-secondary text-secondary-foreground",
  success: "bg-success-subtle text-success",
  warning: "bg-warning-subtle text-warning",
  danger: "bg-danger-subtle text-danger",
  info: "bg-info-subtle text-info",
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ tone = "default", closable = false, onClose, className, style, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
          toneClasses[tone],
          className,
        )}
        style={style}
        {...props}
      >
        {children}
        {closable ? (
          <button
            type="button"
            aria-label="Remove tag"
            onClick={onClose}
            className="rounded-full p-0.5 hover:bg-surface/60"
          >
            <X size={12} />
          </button>
        ) : null}
      </span>
    );
  },
);

Tag.displayName = "Tag";
