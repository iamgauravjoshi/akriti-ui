import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { clearThemeVars } from "../themes/createTheme";
import { ThemeProvider, useTheme } from "./ThemeProvider";

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function ThemeReader() {
  const { theme, resolvedTheme } = useTheme();
  return (
    <p>
      {theme}/{resolvedTheme}
    </p>
  );
}

afterEach(() => {
  clearThemeVars();
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

describe("ThemeProvider", () => {
  it("applies theme token overrides as CSS variables", () => {
    mockMatchMedia(false);
    render(
      <ThemeProvider theme={{ primary: "#123456", radiusMd: "8px" }}>
        <ThemeReader />
      </ThemeProvider>,
    );
    expect(screen.getByText("system/light")).toBeInTheDocument();
    expect(
      document.documentElement.style.getPropertyValue("--ak-primary"),
    ).toBe("#123456");
    expect(
      document.documentElement.style.getPropertyValue("--ak-radius-md"),
    ).toBe("8px");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("prefers theme over customTheme and persists mode choice", () => {
    mockMatchMedia(true);
    render(
      <ThemeProvider
        theme={{ primary: "#111111" }}
        customTheme={{ primary: "#222222" }}
      >
        <ThemeReader />
      </ThemeProvider>,
    );
    expect(screen.getByText("system/dark")).toBeInTheDocument();
    expect(
      document.documentElement.style.getPropertyValue("--ak-primary"),
    ).toBe("#111111");
  });

  it("throws when useTheme is used outside a provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<ThemeReader />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
    spy.mockRestore();
  });
});
