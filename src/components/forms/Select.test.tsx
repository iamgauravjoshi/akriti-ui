import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
];

describe("Select", () => {
  it("selects an option on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} value="" onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Beta" }));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("forwards style to the root element", () => {
    render(<Select options={options} value="" style={{ marginTop: "8px" }} />);
    const root = screen.getByRole("combobox").parentElement?.parentElement;
    expect(root).toHaveStyle({ marginTop: "8px" });
  });
});
