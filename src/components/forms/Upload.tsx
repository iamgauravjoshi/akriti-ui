import {
  forwardRef,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { FileUp, X } from "lucide-react";
import { cn } from "../../lib/cn";

export type UploadProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "className" | "style" | "onDrop"
> & {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  label?: ReactNode;
  hint?: ReactNode;
  id?: string;
  name?: string;
  onFilesChange?: (files: File[]) => void;
  className?: string;
  style?: CSSProperties;
};

export const Upload = forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      accept,
      multiple = false,
      maxFiles,
      maxSize,
      disabled = false,
      label = "Choose files",
      hint = "or drag and drop here",
      id,
      name,
      onFilesChange,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);
    const [rejected, setRejected] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const filesRef = useRef<File[]>([]);

    const commit = (next: File[]) => {
      const capped =
        maxFiles !== undefined ? next.slice(0, maxFiles) : next;
      filesRef.current = capped;
      setFiles(capped);
      onFilesChange?.(capped);
    };

    const addFiles = (incoming: File[]) => {
      if (disabled || incoming.length === 0) return;
      const oversized =
        maxSize !== undefined
          ? incoming.filter((file) => file.size > maxSize)
          : [];
      setRejected(
        oversized.length > 0
          ? `${oversized.length} file(s) exceed the size limit and were skipped.`
          : null,
      );
      const accepted =
        maxSize !== undefined
          ? incoming.filter((file) => file.size <= maxSize)
          : incoming;
      if (accepted.length === 0) return;
      commit(
        multiple
          ? [...filesRef.current, ...accepted]
          : accepted.slice(0, 1),
      );
    };

    const removeFile = (index: number) => {
      commit(files.filter((_, i) => i !== index));
    };

    const onDrop = (event: DragEvent) => {
      event.preventDefault();
      setDragging(false);
      if (!disabled) addFiles(Array.from(event.dataTransfer.files));
    };

    return (
      <div ref={ref} className={cn("space-y-2", className)} style={style} {...props}>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          id={id}
          name={name}
          aria-label={typeof label === "string" ? label : "Choose files"}
          onChange={(event) => {
            addFiles(Array.from(event.target.files ?? []));
            event.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex w-full flex-col items-center gap-1 rounded-lg border border-dashed border-border bg-surface px-4 py-6 text-sm transition-colors",
            "hover:border-foreground/30 disabled:cursor-not-allowed disabled:opacity-50",
            dragging && "border-primary bg-primary/5",
          )}
        >
          <FileUp size={20} className="text-muted-foreground" aria-hidden />
          <span className="font-medium text-foreground">{label}</span>
          {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
        </button>
        {rejected ? (
          <p className="text-sm text-danger" role="alert">
            {rejected}
          </p>
        ) : null}
        {files.length > 0 ? (
          <ul className="space-y-1.5">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm"
              >
                <span className="min-w-0 flex-1 truncate text-foreground">
                  {file.name}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  disabled={disabled}
                  onClick={() => removeFile(index)}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  },
);

Upload.displayName = "Upload";
