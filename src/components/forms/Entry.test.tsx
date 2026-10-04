import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";
import { Upload } from "./Upload";
import { OtpInput } from "./OtpInput";

describe("Slider", () => {
  it("reports numeric changes", () => {
    const onValueChange = vi.fn();
    render(<Slider label="Volume" defaultValue={30} onValueChange={onValueChange} />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    fireEvent.change(slider, { target: { value: "70" } });
    expect(onValueChange).toHaveBeenCalledWith(70);
    expect(screen.getByText("70")).toBeInTheDocument();
  });
});

describe("Upload", () => {
  it("lists selected files and removes them", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    render(<Upload onFilesChange={onFilesChange} />);
    const file = new File(["hello"], "notes.txt", { type: "text/plain" });
    const input = screen.getByLabelText("Choose files");
    await user.upload(input, file);
    expect(screen.getByText("notes.txt")).toBeInTheDocument();
    expect(onFilesChange).toHaveBeenCalledWith([file]);
    await user.click(screen.getByRole("button", { name: "Remove notes.txt" }));
    expect(screen.queryByText("notes.txt")).toBeNull();
  });
});

describe("OtpInput", () => {
  it("advances through boxes and completes", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<OtpInput length={4} label="Code" onComplete={onComplete} />);
    const boxes = screen.getAllByRole("textbox");
    expect(boxes).toHaveLength(4);
    await user.type(boxes[0], "1234");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("moves focus back on backspace from an empty box", async () => {
    const user = userEvent.setup();
    render(<OtpInput length={4} defaultValue="12" />);
    const boxes = screen.getAllByRole("textbox");
    boxes[2].focus();
    await user.keyboard("{Backspace}");
    expect(document.activeElement).toBe(boxes[1]);
  });
});
