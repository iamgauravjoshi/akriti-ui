import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders the element matching level with an accessible heading role", () => {
    render(<Heading level={2}>Section</Heading>);
    const el = screen.getByRole("heading", { level: 2, name: "Section" });
    expect(el.tagName).toBe("H2");
  });

  it("defaults to level 1 and forwards refs", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<Heading ref={ref}>Title</Heading>);
    const el = screen.getByRole("heading", { level: 1 });
    expect(ref.current).toBe(el);
  });
});
