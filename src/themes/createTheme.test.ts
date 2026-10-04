import { describe, expect, it } from "vitest";
import { createTheme } from "./createTheme";

describe("createTheme", () => {
  it("passes flat token overrides through", () => {
    expect(createTheme({ primary: "#123456" })).toEqual({
      primary: "#123456",
    });
  });

  it("flattens nested sections", () => {
    expect(
      createTheme({
        colors: { primary: "#111111" },
        radius: { radiusMd: "8px" },
        duration: { durationFast: "100ms" },
      }),
    ).toEqual({
      primary: "#111111",
      radiusMd: "8px",
      durationFast: "100ms",
    });
  });

  it("prefers flat keys over section values", () => {
    expect(
      createTheme({ colors: { primary: "#aaaaaa" }, primary: "#bbbbbb" }),
    ).toEqual({ primary: "#bbbbbb" });
  });

  it("ignores empty values", () => {
    expect(createTheme({ primary: "" })).toEqual({});
  });
});
