import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";
import { Progress } from "./Progress";
import { Skeleton } from "./Skeleton";

describe("Alert", () => {
  it("announces via role=alert and dismisses on close", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Alert tone="warning" title="Heads up" closable onClose={onClose}>
        Check this.
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Heads up");
    await user.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alert")).toBeNull();
  });
});

describe("Progress", () => {
  it("exposes progress semantics and clamps the value", () => {
    const { rerender } = render(<Progress percent={40} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    rerender(<Progress percent={140} showLabel={false} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });
});

describe("Skeleton", () => {
  it("renders a pulsing placeholder", () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("animate-pulse", "h-4", "w-32");
  });
});
