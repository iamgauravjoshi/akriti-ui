import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Code } from "./Code";
import { Kbd } from "./Kbd";

describe("Code", () => {
  it("renders inline code with muted surface styling", () => {
    render(<Code>npm install</Code>);
    const el = screen.getByText("npm install");
    expect(el.tagName).toBe("CODE");
    expect(el).toHaveClass("bg-muted");
  });

  it("renders keyboard input with kbd semantics", () => {
    render(<Kbd>Ctrl + K</Kbd>);
    const el = screen.getByText("Ctrl + K");
    expect(el.tagName).toBe("KBD");
    expect(el).toHaveClass("border-border");
  });
});
