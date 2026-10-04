import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MultiSelect, Select } from "./Select";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
];

describe("Select", () => {
  it("selects a single option on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} value="" onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(onChange).toHaveBeenCalledWith("apple");
  });

  it("clears the selection", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select options={options} value="apple" clearable onChange={onChange} />,
    );
    await user.click(screen.getByRole("button", { name: "Clear selection" }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("toggles options in multiple mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect options={options} value={["apple"]} onChange={onChange} />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Banana" }));
    expect(onChange).toHaveBeenCalledWith(["apple", "banana"]);
    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("supports keyboard selection and ignores disabled options", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} value="" onChange={onChange} />);
    const box = screen.getByRole("combobox");
    box.focus();
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("apple");
    await user.click(box);
    await user.click(screen.getByRole("option", { name: "Cherry" }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<Select options={options} value="" disabled />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("forwards style to the root element", () => {
    render(<Select options={options} value="" style={{ marginTop: "8px" }} />);
    const root = screen.getByRole("combobox").parentElement?.parentElement;
    expect(root).toHaveStyle({ marginTop: "8px" });
  });
});
