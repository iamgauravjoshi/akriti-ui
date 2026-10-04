import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children and handles click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire click while loading and exposes busy state", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading loadingText="Saving" onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("keeps the deprecated color prop working as intent", () => {
    render(<Button color="danger">Delete</Button>);
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "bg-danger",
    );
  });
});
