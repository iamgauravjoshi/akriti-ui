import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import {
  Form,
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "./Form";
import { Input } from "./Input";
import { Button } from "../buttons/Button";

function Harness({ onSubmit }: { onSubmit: (values: { name: string }) => void }) {
  const form = useForm({ defaultValues: { name: "" } });
  return (
    <Form form={form} onSubmit={onSubmit} style={{ marginTop: "4px" }}>
      <FormField name="name">
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input />
        </FormControl>
        <FormError />
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

describe("Form", () => {
  it("forwards style to the form element", () => {
    const { container } = render(<Harness onSubmit={() => undefined} />);
    expect(container.querySelector("form")).toHaveStyle({
      marginTop: "4px",
    });
  });

  it("submits entered values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} />);
    await user.type(screen.getByRole("textbox"), "Ada");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledWith({ name: "Ada" }, expect.anything());
  });
});
