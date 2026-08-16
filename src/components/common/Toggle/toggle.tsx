import React, { useState, useCallback, useRef, useEffect } from 'react';

interface ToggleButtonProps {
  checked?: boolean;
  defaultChecked: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
  labelPosition?: 'left' | 'right';
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
  value?: string;
  tabIndex?: number;
  autoFocus?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  className: string;
  style?: React.CSSProperties;
  animationDuration?: number;
  disableAnimation?: boolean;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  required?: boolean;
  form?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
                                                     // Core functionality
                                                     checked: controlledChecked,
                                                     defaultChecked = false,
                                                     onChange,

                                                     // Labels and accessibility
                                                     label,
                                                     labelPosition = 'right',
                                                     ariaLabel,
                                                     ariaLabelledBy,
                                                     ariaDescribedBy,

                                                     // Visual customization
                                                     size = 'medium',
                                                     variant = 'default',
                                                     color,

                                                     // States
                                                     disabled = false,
                                                     loading = false,
                                                     readOnly = false,

                                                     // Advanced features
                                                     name,
                                                     id,
                                                     value,
                                                     tabIndex = 0,
                                                     autoFocus = false,

                                                     // Event handlers
                                                     onFocus,
                                                     onBlur,
                                                     onKeyDown,

                                                     // Styling
                                                     className = '',
                                                     style = {},

                                                     // Animation
                                                     animationDuration = 200,
                                                     disableAnimation = false,

                                                     // Icons
                                                     checkedIcon,
                                                     uncheckedIcon,

                                                     // Validation
                                                     required = false,

                                                     // Form integration
                                                     form,
                                                   }) => {
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  const buttonRef = useRef<HTMLButtonElement|null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Auto focus handling
  useEffect(() => {
    if (autoFocus && buttonRef.current) {
      (buttonRef.current as HTMLButtonElement).focus();
    }
  }, [autoFocus]);

  // Size configurations
  const sizeConfig = {
    small: {
      toggle: { width: 36, height: 20, padding: 2 },
      thumb: { size: 16 },
      label: { fontSize: 14 },
      gap: 8
    },
    medium: {
      toggle: { width: 44, height: 24, padding: 2 },
      thumb: { size: 20 },
      label: { fontSize: 16 },
      gap: 12
    },
    large: {
      toggle: { width: 52, height: 28, padding: 3 },
      thumb: { size: 22 },
      label: { fontSize: 18 },
      gap: 16
    }
  };

  const currentSize = sizeConfig[size];

  // Color configurations
  const getColors = () => {
    if (color) {
      return {
        background: checked ? color : '#e5e7eb',
        border: checked ? color : '#d1d5db'
      };
    }

    const variants = {
      default: {
        background: checked ? '#3b82f6' : '#e5e7eb',
        border: checked ? '#3b82f6' : '#d1d5db'
      },
      success: {
        background: checked ? '#10b981' : '#e5e7eb',
        border: checked ? '#10b981' : '#d1d5db'
      },
      warning: {
        background: checked ? '#f59e0b' : '#e5e7eb',
        border: checked ? '#f59e0b' : '#d1d5db'
      },
      danger: {
        background: checked ? '#ef4444' : '#e5e7eb',
        border: checked ? '#ef4444' : '#d1d5db'
      }
    };

    return variants[variant];
  };

  const colors = getColors();

  // Handle toggle
  const handleToggle = useCallback(() => {
    if (disabled || loading || readOnly) return;

    const newChecked = !checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  }, [checked, disabled, loading, readOnly, isControlled, onChange]);

  // Handle keyboard events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      setIsPressed(true);
      handleToggle();
      // Reset pressed state after animation
      setTimeout(() => setIsPressed(false), 150);
    }

    onKeyDown?.(event);
  };

  // Handle mouse events
  const handleMouseDown = () => {
    if (!disabled && !loading && !readOnly) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleToggle();
  };

  // Focus handlers
  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);
    setIsPressed(false);
    onBlur?.(event);
  };

  // Calculate thumb position
  const thumbOffset = checked
    ? currentSize.toggle.width - currentSize.thumb.size - currentSize.toggle.padding * 2
    : 0;

  // Styles
  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: currentSize.gap,
    flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled || loading || readOnly ? 'not-allowed' : 'pointer',
    ...style
  };

  const toggleStyle: React.CSSProperties = {
    position: 'relative',
    width: currentSize.toggle.width,
    height: currentSize.toggle.height,
    backgroundColor: colors.background,
    border: `1px solid ${colors.border}`,
    borderRadius: currentSize.toggle.height / 2,
    padding: currentSize.toggle.padding,
    cursor: 'inherit',
    transition: disableAnimation ? 'none' : `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    outline: 'none',
    boxShadow: isFocused
      ? `0 0 0 3px ${colors.background}33`
      : isPressed
        ? `0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(0, 0, 0, 0.1)`
        : '0 1px 3px rgba(0, 0, 0, 0.1)',
    transform: isPressed ? 'scale(0.98)' : 'scale(1)',
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: currentSize.toggle.padding,
    left: currentSize.toggle.padding + thumbOffset,
    width: currentSize.thumb.size,
    height: currentSize.thumb.size,
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    transition: disableAnimation ? 'none' : `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    fontSize: currentSize.thumb.size * 0.6,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: currentSize.label.fontSize,
    fontWeight: 500,
    color: disabled ? '#9ca3af' : '#374151',
    cursor: 'inherit',
    userSelect: 'none',
    lineHeight: 1.2,
  };

  const loadingSpinnerStyle: React.CSSProperties = {
    width: currentSize.thumb.size * 0.6,
    height: currentSize.thumb.size * 0.6,
    border: '2px solid #e5e7eb',
    borderTop: '2px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  // Generate unique ID if not provided
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      {/* CSS for loading animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={containerStyle} className={className}>
        <button
          ref={buttonRef}
          id={toggleId}
          name={name}
          value={value}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={ariaLabel || (label ? undefined : 'Toggle switch')}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          aria-required={required}
          disabled={disabled}
          tabIndex={disabled ? -1 : tabIndex}
          form={form}
          style={toggleStyle}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div style={thumbStyle}>
            {loading ? (
              <div style={loadingSpinnerStyle} />
            ) : checked ? (
              checkedIcon || null
            ) : (
              uncheckedIcon || null
            )}
          </div>
        </button>

        {label && (
          <label
            htmlFor={toggleId}
            style={labelStyle}
            onClick={(e) => {
              e.preventDefault();
              if (!disabled && !loading && !readOnly) {
                buttonRef.current?.focus();
                handleToggle();
              }
            }}
          >
            {label}
            {required && (
              <span style={{ color: '#ef4444', marginLeft: 4 }}>*</span>
            )}
          </label>
        )}
      </div>
    </>
  );
};
export default ToggleButton;
