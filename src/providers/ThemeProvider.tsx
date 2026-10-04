import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ThemeMode } from "../types/common";
import {
  applyThemeVars,
  clearThemeVars,
  type CustomTheme,
  type ThemeTokens,
} from "../themes/createTheme";

const STORAGE_KEY = "akriti-ui-theme";

type ThemeContextValue = {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme(storageKey: string, fallback: ThemeMode): ThemeMode {
  if (typeof window === "undefined") return fallback;
  const stored = window.localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return fallback;
}

export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
  /**
   * Preferred token overrides. Takes precedence over `customTheme`.
   */
  theme?: ThemeTokens;
  /**
   * @deprecated Use `theme` instead. Kept for backwards compatibility.
   */
  customTheme?: CustomTheme;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = STORAGE_KEY,
  theme,
  customTheme,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() =>
    readStoredTheme(storageKey, defaultTheme),
  );
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(getSystemTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme = mode === "system" ? systemTheme : mode;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  const overrides = theme ?? customTheme;

  useEffect(() => {
    if (!overrides) {
      clearThemeVars();
      return;
    }
    applyThemeVars(overrides);
    return () => clearThemeVars();
  }, [overrides]);

  const setTheme = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      window.localStorage.setItem(storageKey, next);
    },
    [storageKey],
  );

  const value = useMemo(
    () => ({ theme: mode, resolvedTheme, setTheme }),
    [mode, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
