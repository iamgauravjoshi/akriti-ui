import {
  themeCssVarNames,
  type DurationTokenKey,
  type RadiusTokenKey,
  type SemanticTokens,
  type ShadowTokenKey,
  type ThemeTokenKey,
  type ThemeTokens,
  type ZTokenKey,
} from "../tokens/tokens";

export type { ThemeTokens };
export type CustomTheme = ThemeTokens;

export type ThemeColors = Partial<SemanticTokens>;
export type ThemeRadii = Partial<Record<RadiusTokenKey, string>>;
export type ThemeShadows = Partial<Record<ShadowTokenKey, string>>;
export type ThemeZIndices = Partial<Record<ZTokenKey, string>>;
export type ThemeDurations = Partial<Record<DurationTokenKey, string>>;

export type CreateThemeInput = ThemeTokens & {
  colors?: ThemeColors;
  radius?: ThemeRadii;
  shadow?: ThemeShadows;
  zIndex?: ThemeZIndices;
  duration?: ThemeDurations;
};

const sectionKeys = ["colors", "radius", "shadow", "zIndex", "duration"] as const;

export function applyThemeVars(
  vars: ThemeTokens,
  target: HTMLElement = document.documentElement,
) {
  (Object.entries(vars) as [ThemeTokenKey, string][]).forEach(([key, value]) => {
    if (value) {
      target.style.setProperty(themeCssVarNames[key], value);
    }
  });
}

export function clearThemeVars(
  keys: ThemeTokenKey[] = Object.keys(themeCssVarNames) as ThemeTokenKey[],
  target: HTMLElement = document.documentElement,
) {
  keys.forEach((key) => {
    target.style.removeProperty(themeCssVarNames[key]);
  });
}

function isThemeSectionKey(key: string): key is (typeof sectionKeys)[number] {
  return (sectionKeys as readonly string[]).includes(key);
}

export function createTheme(input: CreateThemeInput): ThemeTokens {
  const { colors, radius, shadow, zIndex, duration, ...flat } = input;
  const sections = [colors, radius, shadow, zIndex, duration];
  const merged: ThemeTokens = {};
  for (const section of sections) {
    if (section) {
      for (const [key, value] of Object.entries(section)) {
        if (value && !isThemeSectionKey(key)) {
          (merged as Record<string, string>)[key] = value;
        }
      }
    }
  }
  for (const [key, value] of Object.entries(flat)) {
    if (value && !isThemeSectionKey(key)) {
      (merged as Record<string, string>)[key] = value;
    }
  }
  return merged;
}
