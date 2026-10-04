import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("selects a day and reports a Date", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /Pick a date/ }));
    await user.click(screen.getByRole("button", { name: /15,/ }));
    expect(onChange).toHaveBeenCalledTimes(1);
    const picked: Date = onChange.mock.calls[0][0];
    expect(picked).toBeInstanceOf(Date);
    expect(picked.getDate()).toBe(15);
  });

  it("navigates months", async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 5, 10)} />);
    await user.click(screen.getByRole("button", { name: /June 10, 2026/ }));
    expect(screen.getByText("June 2026")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("July 2026")).toBeInTheDocument();
  });
});
