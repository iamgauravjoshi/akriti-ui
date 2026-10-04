import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders as a span by default with foreground tone", () => {
    render(<Text>Hello</Text>);
    const el = screen.getByText("Hello");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("text-foreground");
  });

  it("supports the as prop, tone, and ref forwarding", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Text as="p" tone="muted" size="sm" ref={ref}>
        Hi
      </Text>,
    );
    const el = screen.getByText("Hi");
    expect(el.tagName).toBe("P");
    expect(el).toHaveClass("text-muted-foreground", "text-sm");
    expect(ref.current).toBe(el);
  });
});
