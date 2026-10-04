export const semanticTokenKeys = [
  "background",
  "foreground",
  "surface",
  "muted",
  "mutedForeground",
  "border",
  "primary",
  "primaryForeground",
  "primaryHover",
  "secondary",
  "secondaryForeground",
  "success",
  "successForeground",
  "successSubtle",
  "warning",
  "warningForeground",
  "warningSubtle",
  "danger",
  "dangerForeground",
  "dangerSubtle",
  "info",
  "infoForeground",
  "infoSubtle",
  "focus",
  "disabled",
  "overlay",
] as const;

export type SemanticTokenKey = (typeof semanticTokenKeys)[number];

export type SemanticTokens = Record<SemanticTokenKey, string>;

export const cssVarNames: Record<SemanticTokenKey, string> = {
  background: "--ak-background",
  foreground: "--ak-foreground",
  surface: "--ak-surface",
  muted: "--ak-muted",
  mutedForeground: "--ak-muted-foreground",
  border: "--ak-border",
  primary: "--ak-primary",
  primaryForeground: "--ak-primary-foreground",
  primaryHover: "--ak-primary-hover",
  secondary: "--ak-secondary",
  secondaryForeground: "--ak-secondary-foreground",
  success: "--ak-success",
  successForeground: "--ak-success-foreground",
  successSubtle: "--ak-success-subtle",
  warning: "--ak-warning",
  warningForeground: "--ak-warning-foreground",
  warningSubtle: "--ak-warning-subtle",
  danger: "--ak-danger",
  dangerForeground: "--ak-danger-foreground",
  dangerSubtle: "--ak-danger-subtle",
  info: "--ak-info",
  infoForeground: "--ak-info-foreground",
  infoSubtle: "--ak-info-subtle",
  focus: "--ak-focus",
  disabled: "--ak-disabled",
  overlay: "--ak-overlay",
};

export const lightTokens: SemanticTokens = {
  background: "#f8fafc",
  foreground: "#0f172a",
  surface: "#ffffff",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  border: "#e2e8f0",
  primary: "#2563eb",
  primaryForeground: "#ffffff",
  primaryHover: "#1d4ed8",
  secondary: "#e2e8f0",
  secondaryForeground: "#0f172a",
  success: "#16a34a",
  successForeground: "#ffffff",
  successSubtle: "#dcfce7",
  warning: "#ca8a04",
  warningForeground: "#ffffff",
  warningSubtle: "#fef9c3",
  danger: "#dc2626",
  dangerForeground: "#ffffff",
  dangerSubtle: "#fee2e2",
  info: "#0891b2",
  infoForeground: "#ffffff",
  infoSubtle: "#cffafe",
  focus: "#2563eb",
  disabled: "#94a3b8",
  overlay: "rgba(15, 23, 42, 0.5)",
};

export const darkTokens: SemanticTokens = {
  background: "#0f172a",
  foreground: "#f8fafc",
  surface: "#1e293b",
  muted: "#334155",
  mutedForeground: "#94a3b8",
  border: "#334155",
  primary: "#3b82f6",
  primaryForeground: "#ffffff",
  primaryHover: "#2563eb",
  secondary: "#334155",
  secondaryForeground: "#f8fafc",
  success: "#22c55e",
  successForeground: "#052e16",
  successSubtle: "#14532d",
  warning: "#eab308",
  warningForeground: "#422006",
  warningSubtle: "#713f12",
  danger: "#f87171",
  dangerForeground: "#450a0a",
  dangerSubtle: "#7f1d1d",
  info: "#22d3ee",
  infoForeground: "#083344",
  infoSubtle: "#164e63",
  focus: "#60a5fa",
  disabled: "#64748b",
  overlay: "rgba(2, 6, 23, 0.7)",
};

export const radiusTokenKeys = ["radiusSm", "radiusMd", "radiusLg", "radiusXl"] as const;

export const shadowTokenKeys = ["shadowSm", "shadowMd", "shadowLg"] as const;

export const zTokenKeys = ["zOverlay", "zToast"] as const;

export const durationTokenKeys = ["durationFast", "durationNormal"] as const;

export type RadiusTokenKey = (typeof radiusTokenKeys)[number];
export type ShadowTokenKey = (typeof shadowTokenKeys)[number];
export type ZTokenKey = (typeof zTokenKeys)[number];
export type DurationTokenKey = (typeof durationTokenKeys)[number];

export type ThemeTokenKey =
  | SemanticTokenKey
  | RadiusTokenKey
  | ShadowTokenKey
  | ZTokenKey
  | DurationTokenKey;

export const themeCssVarNames: Record<ThemeTokenKey, string> = {
  ...cssVarNames,
  radiusSm: "--ak-radius-sm",
  radiusMd: "--ak-radius-md",
  radiusLg: "--ak-radius-lg",
  radiusXl: "--ak-radius-xl",
  shadowSm: "--ak-shadow-sm",
  shadowMd: "--ak-shadow-md",
  shadowLg: "--ak-shadow-lg",
  zOverlay: "--ak-z-overlay",
  zToast: "--ak-z-toast",
  durationFast: "--ak-duration-fast",
  durationNormal: "--ak-duration-normal",
};

export type ThemeTokens = Partial<Record<ThemeTokenKey, string>>;
