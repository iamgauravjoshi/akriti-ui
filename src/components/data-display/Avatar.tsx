import {
  forwardRef,
  type CSSProperties,
  type ImgHTMLAttributes,
  type Ref,
} from "react";
import { cn } from "../../lib/cn";
import type { Size } from "../../types/common";

export type AvatarSize = Extract<Size, "xs" | "sm" | "md" | "lg" | "xl">;

export type AvatarProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "className" | "style" | "srcSet"
> & {
  name?: string;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
};

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export const Avatar = forwardRef<HTMLImageElement | HTMLSpanElement, AvatarProps>(
  ({ name, size = "md", alt, className, style, ...props }, ref) => {
    const shape = cn(
      "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium",
      sizeClasses[size],
      className,
    );
    if (!props.src) {
      return (
        <span
          ref={ref as Ref<HTMLSpanElement>}
          role="img"
          aria-label={alt ?? name}
          className={cn(shape, "bg-secondary text-secondary-foreground")}
          style={style}
        >
          {name ? initials(name) : null}
        </span>
      );
    }
    return (
      <img
        ref={ref as Ref<HTMLImageElement>}
        alt={alt ?? name ?? ""}
        className={cn(shape, "bg-muted object-cover")}
        style={style}
        {...props}
      />
    );
  },
);

Avatar.displayName = "Avatar";
