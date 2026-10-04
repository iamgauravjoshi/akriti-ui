import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Apricot", value: "apricot" },
  { label: "Banana", value: "banana" },
];

describe("Combobox", () => {
  it("filters options while typing and selects on Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    const box = screen.getByRole("combobox");
    await user.click(box);
    await user.type(box, "ap");
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Banana" })).toBeNull();
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("apple");
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} />);
    const box = screen.getByRole("combobox");
    await user.click(box);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
