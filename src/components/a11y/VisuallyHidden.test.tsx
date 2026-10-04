import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  it("hides content visually while keeping it accessible", () => {
    render(<VisuallyHidden>Screen reader only</VisuallyHidden>);
    const el = screen.getByText("Screen reader only");
    expect(el).toHaveClass("sr-only");
  });
});
