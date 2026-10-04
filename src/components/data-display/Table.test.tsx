import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Table } from "./Table";

const rows = [
  { id: 1, name: "Alpha", role: "Admin" },
  { id: 2, name: "Beta", role: "Editor" },
];

describe("Table", () => {
  it("sorts by column and selects a row", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <Table
        data={rows}
        selectable
        showSearch={false}
        columns={[
          { key: "name", title: "Name", sortable: true },
          { key: "role", title: "Role" },
        ]}
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByRole("columnheader", { name: "Name" }));
    const cells = screen.getAllByRole("cell");
    expect(cells.map((cell) => cell.textContent).join(" ")).toContain("Alpha");

    await user.click(screen.getAllByLabelText("Select row")[0]);
    expect(onSelectionChange).toHaveBeenCalled();
  });
});
