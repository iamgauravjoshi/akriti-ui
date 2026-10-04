/* eslint-disable react-refresh/only-export-components -- provider + hook intentionally co-located in library code */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { cn } from "../../lib/cn";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastAnimation = "slide" | "fade";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export type ToastOptions = {
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
  closable?: boolean;
  pauseOnHover?: boolean;
  showProgress?: boolean;
  onClose?: () => void;
};

export type ToastRecord = {
  id: string;
  options: ToastOptions;
  isExiting: boolean;
};

export type ToastConfig = {
  position: ToastPosition;
  animation: ToastAnimation;
  autoClose: number;
  preventDuplicates: boolean;
  pauseOnHover: boolean;
};

export type ToastContextValue = {
  toasts: ToastRecord[];
  config: ToastConfig;
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  success: (title: string, options?: Partial<ToastOptions>) => string;
  error: (title: string, options?: Partial<ToastOptions>) => string;
  warning: (title: string, options?: Partial<ToastOptions>) => string;
  info: (title: string, options?: Partial<ToastOptions>) => string;
  updateConfig: (config: Partial<ToastConfig>) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export type ToastProviderProps = {
  children: ReactNode;
  position?: ToastPosition;
  animation?: ToastAnimation;
  autoClose?: number;
  preventDuplicates?: boolean;
  pauseOnHover?: boolean;
};

const icons: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="h-4 w-4" />,
  error: <AlertCircle className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

const tone: Record<ToastType, { icon: string; bar: string; border: string }> = {
  success: {
    icon: "text-success bg-success-subtle",
    bar: "bg-success",
    border: "border-l-success",
  },
  error: {
    icon: "text-danger bg-danger-subtle",
    bar: "bg-danger",
    border: "border-l-danger",
  },
  warning: {
    icon: "text-warning bg-warning-subtle",
    bar: "bg-warning",
    border: "border-l-warning",
  },
  info: {
    icon: "text-info bg-info-subtle",
    bar: "bg-info",
    border: "border-l-info",
  },
};

const positions: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export function ToastProvider({
  children,
  position = "top-right",
  animation = "slide",
  autoClose = 5000,
  preventDuplicates = false,
  pauseOnHover = true,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const [config, setConfig] = useState<ToastConfig>({
    position,
    animation,
    autoClose,
    preventDuplicates,
    pauseOnHover,
  });
  const idRef = useRef(0);
  const pendingRemovals = useRef<Set<number>>(new Set());

  useEffect(() => {
    const pending = pendingRemovals.current;
    return () => {
      pending.forEach((timeout) => window.clearTimeout(timeout));
      pending.clear();
    };
  }, []);

  const scheduleRemoval = useCallback((fn: () => void, delay: number) => {
    const timeout = window.setTimeout(() => {
      pendingRemovals.current.delete(timeout);
      fn();
    }, delay);
    pendingRemovals.current.add(timeout);
  }, []);

  const addToast = useCallback(
    (options: ToastOptions): string => {
      if (config.preventDuplicates) {
        const duplicate = toasts.find(
          (toast) =>
            toast.options.title === options.title &&
            toast.options.type === options.type,
        );
        if (duplicate) return duplicate.id;
      }
      const id = `toast-${++idRef.current}`;
      setToasts((prev) =>
        [
          {
            id,
            options: {
              duration: config.autoClose,
              pauseOnHover: config.pauseOnHover,
              ...options,
            },
            isExiting: false,
          },
          ...prev,
        ].slice(0, 5),
      );
      return id;
    },
    [config.autoClose, config.pauseOnHover, config.preventDuplicates, toasts],
  );

  const removeToast = useCallback(
    (id: string) => {
      setToasts((prev) =>
        prev.map((toast) => (toast.id === id ? { ...toast, isExiting: true } : toast)),
      );
      scheduleRemoval(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 200);
    },
    [scheduleRemoval],
  );

  const clearAllToasts = useCallback(() => {
    setToasts((prev) => prev.map((toast) => ({ ...toast, isExiting: true })));
    scheduleRemoval(() => setToasts([]), 200);
  }, [scheduleRemoval]);

  const success = useCallback(
    (title: string, options: Partial<ToastOptions> = {}) =>
      addToast({ ...options, type: "success", title }),
    [addToast],
  );
  const error = useCallback(
    (title: string, options: Partial<ToastOptions> = {}) =>
      addToast({ ...options, type: "error", title }),
    [addToast],
  );
  const warning = useCallback(
    (title: string, options: Partial<ToastOptions> = {}) =>
      addToast({ ...options, type: "warning", title }),
    [addToast],
  );
  const info = useCallback(
    (title: string, options: Partial<ToastOptions> = {}) =>
      addToast({ ...options, type: "info", title }),
    [addToast],
  );

  const updateConfig = useCallback((next: Partial<ToastConfig>) => {
    setConfig((prev) => ({ ...prev, ...next }));
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        config,
        addToast,
        removeToast,
        clearAllToasts,
        success,
        error,
        warning,
        info,
        updateConfig,
      }}
    >
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastRecord;
  onRemove: (id: string) => void;
}) {
  const { config } = useToast();
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const remaining = useRef(toast.options.duration ?? 0);
  const started = useRef<number | null>(null);
  const timer = useRef<number | null>(null);
  const closeFired = useRef(false);
  const type = toast.options.type ?? "info";
  const duration = toast.options.duration ?? 0;

  const fireClose = useCallback(() => {
    if (closeFired.current) return;
    closeFired.current = true;
    if (timer.current) window.clearTimeout(timer.current);
    onRemove(toast.id);
    toast.options.onClose?.();
  }, [onRemove, toast]);

  const startTimer = useCallback(() => {
    if (!duration) return;
    started.current = Date.now();
    timer.current = window.setTimeout(fireClose, remaining.current);
  }, [duration, fireClose]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [startTimer]);

  useEffect(() => {
    if (!toast.options.showProgress || !duration) return;
    const interval = window.setInterval(() => {
      if (!paused) {
        setProgress((prev) => Math.max(0, prev - 100 / (duration / 100)));
      }
    }, 100);
    return () => window.clearInterval(interval);
  }, [duration, paused, toast.options.showProgress]);

  return (
    <div
      role="status"
      className={cn(
        "w-full max-w-sm rounded-lg border border-border border-l-4 bg-surface p-4 shadow-md",
        tone[type].border,
        toast.isExiting ? "opacity-0" : "opacity-100",
        "transition-opacity duration-200",
      )}
      onMouseEnter={() => {
        if (toast.options.pauseOnHover ?? config.pauseOnHover) {
          setPaused(true);
          if (timer.current) {
            window.clearTimeout(timer.current);
            remaining.current = Math.max(
              0,
              remaining.current - (Date.now() - (started.current ?? 0)),
            );
          }
        }
      }}
      onMouseLeave={() => {
        if (toast.options.pauseOnHover ?? config.pauseOnHover) {
          setPaused(false);
          startTimer();
        }
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            tone[type].icon,
          )}
        >
          {icons[type]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">{toast.options.title}</p>
              {toast.options.description ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  {toast.options.description}
                </p>
              ) : null}
            </div>
            {toast.options.closable !== false ? (
              <button
                type="button"
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Close notification"
                onClick={fireClose}
              >
                <X size={14} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {toast.options.showProgress !== false && duration > 0 ? (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full transition-all duration-100", tone[type].bar)}
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}

export function Toaster() {
  const { toasts, config, removeToast } = useToast();
  if (toasts.length === 0) return null;
  return (
    <div
      className={cn(
        "pointer-events-none fixed z-[var(--ak-z-toast)] flex max-h-screen flex-col gap-2",
        positions[config.position],
      )}
    >
      <div className="pointer-events-auto flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </div>
  );
}
