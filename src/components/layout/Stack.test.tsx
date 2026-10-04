import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders a vertical flex column by default", () => {
    render(
      <Stack>
        <span>a</span>
        <span>b</span>
      </Stack>,
    );
    const root = screen.getByText("a").parentElement;
    expect(root).toHaveClass("flex", "flex-col");
  });

  it("supports direction, gap, alignment, polymorphism, and refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Stack
        as="section"
        direction="row"
        gap={2}
        align="center"
        justify="between"
        wrap
        aria-label="row"
        ref={ref}
      >
        <span>x</span>
      </Stack>,
    );
    const root = screen.getByRole("region", { name: "row" });
    expect(root.tagName).toBe("SECTION");
    expect(root).toHaveClass(
      "flex-row",
      "items-center",
      "justify-between",
      "flex-wrap",
    );
    expect(root).toHaveStyle({ gap: "calc(var(--spacing) * 2)" });
    expect(ref.current).toBe(root);
  });
});
