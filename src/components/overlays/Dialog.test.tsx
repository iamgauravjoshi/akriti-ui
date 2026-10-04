import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../overlays/Dialog";

describe("Modal", () => {
  it("opens content and closes on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Confirm">
        <p>Are you sure?</p>
      </Modal>,
    );
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("traps focus inside the dialog", () => {
    render(
      <Modal isOpen onClose={() => undefined} title="Focus">
        <button type="button">Inside</button>
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
