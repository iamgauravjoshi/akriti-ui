import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable, type DataTableColumn } from "./DataTable";

type User = { id: number; name: string; role: string };

const rows: User[] = [
  { id: 1, name: "Charlie", role: "Admin" },
  { id: 2, name: "Alpha", role: "Editor" },
  { id: 3, name: "Beta", role: "Viewer" },
];

const columns: DataTableColumn<User>[] = [
  { key: "name", header: "Name", accessor: (user) => user.name, sortable: true },
  { key: "role", header: "Role", accessor: (user) => user.role },
];

const rowKey = (user: User) => user.id;

describe("DataTable", () => {
  it("sorts by accessor when the header is clicked", async () => {
    const user = userEvent.setup();
    render(<DataTable data={rows} columns={columns} rowKey={rowKey} searchable={false} />);
    const cells = () => screen.getAllByRole("cell").map((cell) => cell.textContent);
    const nameHeader = screen.getByRole("columnheader", { name: "Name" });
    expect(cells()[0]).toBe("Charlie");
    await user.click(nameHeader);
    expect(cells()[0]).toBe("Alpha");
    await user.click(nameHeader);
    expect(cells()[0]).toBe("Charlie");
  });

  it("filters rows by search and paginates", async () => {
    const user = userEvent.setup();
    render(
      <DataTable data={rows} columns={columns} rowKey={rowKey} pageSize={1} />,
    );
    expect(screen.getByText(/of 3 results/)).toBeInTheDocument();
    await user.type(screen.getByRole("searchbox"), "beta");
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.queryByText("Alpha")).toBeNull();
  });

  it("selects rows and reports selection", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <DataTable
        data={rows}
        columns={columns}
        rowKey={rowKey}
        searchable={false}
        selectable
        onSelectionChange={onSelectionChange}
      />,
    );
    await user.click(screen.getAllByLabelText("Select row")[0]);
    expect(onSelectionChange).toHaveBeenCalledWith([rows[0]], [1]);
  });
});
