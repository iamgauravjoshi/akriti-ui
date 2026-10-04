import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Flex } from "./Flex";

describe("Flex", () => {
  it("renders a horizontal flex row by default", () => {
    render(
      <Flex>
        <span>a</span>
      </Flex>,
    );
    expect(screen.getByText("a").parentElement).toHaveClass(
      "flex",
      "flex-row",
    );
  });
});
