import {
  forwardRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { cn } from "../../lib/cn";

export type AlertTone = "info" | "success" | "warning" | "danger";

export type AlertProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> & {
  tone?: AlertTone;
  title?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
};

const meta: Record<AlertTone, { icon: ReactNode; classes: string }> = {
  info: { icon: <Info size={18} />, classes: "border-info bg-info-subtle text-info" },
  success: {
    icon: <CheckCircle size={18} />,
    classes: "border-success bg-success-subtle text-success",
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    classes: "border-warning bg-warning-subtle text-warning",
  },
  danger: {
    icon: <AlertCircle size={18} />,
    classes: "border-danger bg-danger-subtle text-danger",
  },
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { tone = "info", title, closable = false, onClose, className, style, children, ...props },
    ref,
  ) => {
    const [dismissed, setDismissed] = useState(false);
    if (dismissed) return null;
    const toneMeta = meta[tone];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn("flex items-start gap-3 rounded-lg border p-4", toneMeta.classes, className)}
        style={style}
        {...props}
      >
        <span className="mt-0.5 shrink-0" aria-hidden>
          {toneMeta.icon}
        </span>
        <div className="min-w-0 flex-1 text-sm">
          {title ? <p className="font-semibold">{title}</p> : null}
          {children ? <div className={title ? "mt-1" : undefined}>{children}</div> : null}
        </div>
        {closable ? (
          <button
            type="button"
            aria-label="Dismiss alert"
            onClick={() => {
              setDismissed(true);
              onClose?.();
            }}
            className="rounded p-1 hover:bg-surface/60"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>
    );
  },
);

Alert.displayName = "Alert";
