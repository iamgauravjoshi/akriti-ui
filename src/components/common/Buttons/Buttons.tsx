import React, { useState, forwardRef } from "react";
import { X, Loader2 } from "lucide-react";
import type { ButtonProps, CloseButtonProps } from "./Buttons.types";

// Main Button Component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      intent = "default",
      size = "md",
      loading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      onClick,
      loadingText = "Loading...",
      rounded = "md",
      animation = "none",
      gradient = false,
      shadow = "sm",
      className = "",
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    // Base classes
    const baseClasses = `
    inline-flex items-center cursor-pointer justify-center font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 active:transform
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${fullWidth ? "w-full" : ""}
  `;

    // Size classes
    const sizeClasses = {
      xs: "px-2 py-1 text-xs gap-1",
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-2.5 text-base gap-2",
      xl: "px-8 py-3 text-lg gap-2.5",
    };

    // Rounded classes
    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    // Shadow classes
    const shadowClasses = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };

    // Animation classes
    const animationClasses = {
      none: "",
      pulse: "hover:animate-pulse",
      bounce: "hover:animate-bounce",
      scale: "hover:scale-105 active:scale-95",
      glow: "hover:shadow-lg hover:shadow-current/25",
    };

    // Variant and intent combinations
    const getVariantClasses = () => {
      const variants = {
        primary: {
          default: gradient
            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500"
            : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
          success: gradient
            ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white focus:ring-green-500"
            : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
          warning: gradient
            ? "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white focus:ring-yellow-500"
            : "bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500",
          error: gradient
            ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-red-500"
            : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
          info: gradient
            ? "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white focus:ring-cyan-500"
            : "bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500",
        },
        secondary: {
          default:
            "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500",
          success:
            "bg-green-100 hover:bg-green-200 text-green-800 focus:ring-green-500",
          warning:
            "bg-yellow-100 hover:bg-yellow-200 text-yellow-800 focus:ring-yellow-500",
          error: "bg-red-100 hover:bg-red-200 text-red-800 focus:ring-red-500",
          info: "bg-cyan-100 hover:bg-cyan-200 text-cyan-800 focus:ring-cyan-500",
        },
        outline: {
          default:
            "border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
          success:
            "border-2 border-green-300 hover:border-green-400 text-green-700 hover:bg-green-50 focus:ring-green-500",
          warning:
            "border-2 border-yellow-300 hover:border-yellow-400 text-yellow-700 hover:bg-yellow-50 focus:ring-yellow-500",
          error:
            "border-2 border-red-300 hover:border-red-400 text-red-700 hover:bg-red-50 focus:ring-red-500",
          info: "border-2 border-cyan-300 hover:border-cyan-400 text-cyan-700 hover:bg-cyan-50 focus:ring-cyan-500",
        },
        ghost: {
          default: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
          success: "text-green-700 hover:bg-green-50 focus:ring-green-500",
          warning: "text-yellow-700 hover:bg-yellow-50 focus:ring-yellow-500",
          error: "text-red-700 hover:bg-red-50 focus:ring-red-500",
          info: "text-cyan-700 hover:bg-cyan-50 focus:ring-cyan-500",
        },
        text: {
          default:
            "text-gray-700 hover:text-gray-900 hover:underline focus:ring-gray-500",
          success:
            "text-green-700 hover:text-green-900 hover:underline focus:ring-green-500",
          warning:
            "text-yellow-700 hover:text-yellow-900 hover:underline focus:ring-yellow-500",
          error:
            "text-red-700 hover:text-red-900 hover:underline focus:ring-red-500",
          info: "text-cyan-700 hover:text-cyan-900 hover:underline focus:ring-cyan-500",
        },
        link: {
          default:
            "text-blue-600 hover:text-blue-800 hover:underline focus:ring-blue-500",
          success:
            "text-green-600 hover:text-green-800 hover:underline focus:ring-green-500",
          warning:
            "text-yellow-600 hover:text-yellow-800 hover:underline focus:ring-yellow-500",
          error:
            "text-red-600 hover:text-red-800 hover:underline focus:ring-red-500",
          info: "text-cyan-600 hover:text-cyan-800 hover:underline focus:ring-cyan-500",
        },
      };

      return variants[variant][intent];
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;

      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);

      if (onClick) {
        onClick(event);
      }
    };

    const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${roundedClasses[rounded]}
    ${shadowClasses[shadow]}
    ${animationClasses[animation]}
    ${getVariantClasses()}
    ${isPressed ? "transform scale-95" : ""}
    ${className}
  `;

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <>
            <Loader2
              className="animate-spin"
              size={size === "xs" ? 12 : size === "sm" ? 14 : 16}
            />
            {loadingText}
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Close Button Component
const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  (
    {
      onClose,
      ariaLabel = "Close",
      size = "sm",
      variant = "ghost",
      intent = "default",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        intent={intent}
        size={size}
        onClick={onClose}
        aria-label={ariaLabel}
        className={`${className}`}
        rounded="full"
        {...props}
      >
        <X
          size={
            size === "xs"
              ? 12
              : size === "sm"
                ? 14
                : size === "md"
                  ? 16
                  : size === "lg"
                    ? 18
                    : 20
          }
        />
      </Button>
    );
  }
);

CloseButton.displayName = "CloseButton";

export { Button, CloseButton };
