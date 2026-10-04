import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a horizontal separator by default", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toHaveClass("border-t", "w-full");
  });

  it("renders a vertical separator", () => {
    render(<Divider orientation="vertical" aria-label="v" />);
    expect(screen.getByRole("separator", { name: "v" })).toHaveClass(
      "border-l",
      "self-stretch",
    );
  });
});
