import { useState } from "react";
import {
  DataTable,
  Heading,
  Stack,
  Tag,
  type DataTableColumn,
} from "..";

type Member = { id: number; name: string; role: string; active: boolean };

const rows: Member[] = [
  { id: 1, name: "Ada Lovelace", role: "Admin", active: true },
  { id: 2, name: "Alan Turing", role: "Editor", active: true },
  { id: 3, name: "Grace Hopper", role: "Viewer", active: false },
  { id: 4, name: "Linus Torvalds", role: "Editor", active: true },
];

const columns: DataTableColumn<Member>[] = [
  { key: "name", header: "Name", accessor: (member) => member.name, sortable: true },
  { key: "role", header: "Role", accessor: (member) => member.role, sortable: true },
  {
    key: "active",
    header: "Status",
    accessor: (member) => (member.active ? "Active" : "Inactive"),
    render: (value) => (
      <Tag tone={value === "Active" ? "success" : "default"}>
        {String(value)}
      </Tag>
    ),
  },
];

export default function DataTableDemo() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  return (
    <Stack gap={4}>
      <Heading level={2}>Data table</Heading>
      <DataTable
        data={rows}
        columns={columns}
        rowKey={(member) => member.id}
        selectable
        selected={selectedIds}
        onSelectionChange={(_, ids) => setSelectedIds(ids)}
        pageSize={10}
      />
    </Stack>
  );
}
