export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "outline" | "ghost" | "link";
  intent?: "default" | "success" | "warning" | "error" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loadingText?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  animation?: "none" | "pulse" | "bounce" | "scale" | "glow";
  gradient?: boolean;
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
}

export interface CloseButtonProps extends Omit<ButtonProps, "children"> {
  onClose: () => void;
  ariaLabel?: string;
}
