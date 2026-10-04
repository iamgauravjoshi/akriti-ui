import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Badge } from "./Badge";
import { Tag } from "./Tag";
import { Avatar } from "./Avatar";
import { Empty } from "./Empty";

describe("Badge", () => {
  it("renders the count and truncates above max", () => {
    const { rerender } = render(<Badge count={5}>inbox</Badge>);
    expect(screen.getByText("5")).toBeInTheDocument();
    rerender(<Badge count={120}>inbox</Badge>);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("hides zero counts unless showZero", () => {
    const { container, rerender } = render(<Badge count={0}>inbox</Badge>);
    expect(container.querySelector(".absolute")).toBeNull();
    rerender(
      <Badge count={0} showZero>
        inbox
      </Badge>,
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});

describe("Tag", () => {
  it("calls onClose when the remove button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Tag tone="success" closable onClose={onClose}>
        New
      </Tag>,
    );
    await user.click(screen.getByRole("button", { name: "Remove tag" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("Avatar", () => {
  it("falls back to initials without a src", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent(
      "AL",
    );
  });

  it("renders an image when src is provided", () => {
    render(<Avatar src="/ada.png" alt="Ada" />);
    expect(screen.getByRole("img", { name: "Ada" }).tagName).toBe("IMG");
  });
});

describe("Empty", () => {
  it("renders title, description, and actions", () => {
    render(
      <Empty title="Nothing here" description="Try again later">
        <button type="button">Retry</button>
      </Empty>,
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Retry" }),
    ).toBeInTheDocument();
  });
});
