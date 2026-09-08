import {
  cssVarNames,
  type SemanticTokenKey,
  type SemanticTokens,
} from "../tokens/tokens";

export type CustomTheme = Partial<SemanticTokens>;

export function applyThemeVars(
  vars: CustomTheme,
  target: HTMLElement = document.documentElement,
) {
  (Object.entries(vars) as [SemanticTokenKey, string][]).forEach(
    ([key, value]) => {
      if (value) {
        target.style.setProperty(cssVarNames[key], value);
      }
    },
  );
}

export function clearThemeVars(
  keys: SemanticTokenKey[] = Object.keys(cssVarNames) as SemanticTokenKey[],
  target: HTMLElement = document.documentElement,
) {
  keys.forEach((key) => {
    target.style.removeProperty(cssVarNames[key]);
  });
}

export function createTheme(overrides: CustomTheme): CustomTheme {
  return { ...overrides };
}
