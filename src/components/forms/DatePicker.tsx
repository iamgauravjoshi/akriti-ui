import {
  forwardRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { fieldChrome } from "../../lib/variants";
import { Popover } from "../overlays/Popover";

export type DatePickerProps = {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: ReactNode;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  style?: CSSProperties;
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const weekdayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatDate(date: Date): string {
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      label,
      required,
      placeholder = "Pick a date",
      disabled = false,
      clearable = false,
      className,
      style,
    },
    ref,
  ) => {
    const [internal, setInternal] = useState<Date | undefined>(defaultValue);
    const current = value ?? internal;
    const [open, setOpen] = useState(false);
    const today = new Date();
    const [viewYear, setViewYear] = useState(
      (current ?? today).getFullYear(),
    );
    const [viewMonth, setViewMonth] = useState((current ?? today).getMonth());

    const commit = (next: Date | undefined) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    const moveMonth = (delta: number) => {
      const next = new Date(viewYear, viewMonth + delta, 1);
      setViewYear(next.getFullYear());
      setViewMonth(next.getMonth());
    };

    const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [
      ...Array<null>(firstWeekday).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
      <div className={cn("space-y-1.5", className)} style={style}>
        {label ? (
          <span className="block text-sm font-medium text-foreground">
            {label}
            {required ? (
              <span className="ml-0.5 text-danger" aria-hidden>
                *
              </span>
            ) : null}
          </span>
        ) : null}
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={
            <button
              ref={ref}
              type="button"
              disabled={disabled}
              className={cn(
                fieldChrome(false),
                "flex h-10 items-center justify-between gap-2 px-3 text-sm",
                !current && "text-muted-foreground",
              )}
            >
              <span className="flex items-center gap-2">
                <CalendarIcon size={16} className="text-muted-foreground" aria-hidden />
                {current ? formatDate(current) : placeholder}
              </span>
              {clearable && current && !disabled ? (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Clear date"
                  onClick={(event) => {
                    event.stopPropagation();
                    commit(undefined);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      commit(undefined);
                    }
                  }}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X size={14} />
                </span>
              ) : null}
            </button>
          }
        >
          <div aria-label="Choose date">
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => moveMonth(-1)}
                className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ChevronLeft size={16} />
              </button>
              <p className="text-sm font-medium" aria-live="polite">
                {monthNames[viewMonth]} {viewYear}
              </p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => moveMonth(1)}
                className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {weekdayNames.map((day) => (
                <span key={day} className="py-1 text-xs text-muted-foreground" aria-hidden>
                  {day}
                </span>
              ))}
              {cells.map((day, index) =>
                day === null ? (
                  <span key={`empty-${index}`} />
                ) : (
                  <button
                    key={day}
                    type="button"
                    aria-label={`${monthNames[viewMonth]} ${day}, ${viewYear}`}
                    onClick={() => {
                      commit(new Date(viewYear, viewMonth, day));
                      setOpen(false);
                    }}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors hover:bg-muted",
                      current &&
                        sameDay(current, new Date(viewYear, viewMonth, day))
                        ? "bg-primary font-medium text-primary-foreground"
                        : "text-foreground",
                    )}
                  >
                    {day}
                  </button>
                ),
              )}
            </div>
          </div>
        </Popover>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
