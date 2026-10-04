import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FieldForm } from "./FieldForm";

describe("FieldForm", () => {
  it("coerces number fields to numbers on submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <FieldForm
        fields={[{ type: "number", name: "age", label: "Age" }]}
        onSubmit={onSubmit}
      />,
    );
    await user.type(screen.getByRole("spinbutton"), "42");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledWith({ age: 42 });
  });

  it("restores defaultFormData on reset", async () => {
    const user = userEvent.setup();
    render(
      <FieldForm
        fields={[{ type: "text", name: "name", label: "Name" }]}
        defaultFormData={{ name: "Ada" }}
        resetText="Reset"
        onSubmit={() => undefined}
      />,
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Ada");
    await user.clear(input);
    await user.type(input, "Bob");
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("textbox")).toHaveValue("Ada");
  });
});
