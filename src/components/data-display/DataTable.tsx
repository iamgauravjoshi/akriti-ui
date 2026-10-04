import {
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Check, Search, Square } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "../buttons/Button";
import { Spinner } from "../feedback/Spinner";
import { useTablePagination } from "./useTable";

export type DataTableSort = {
  key: string;
  direction: "asc" | "desc";
};

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  accessor: (row: T) => unknown;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
  className?: string;
};

export type DataTableProps<T extends object> = {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey: (row: T, index: number) => string | number;
  sort?: DataTableSort | null;
  defaultSort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  selectable?: boolean;
  selected?: (string | number)[];
  defaultSelected?: (string | number)[];
  onSelectionChange?: (selectedRows: T[], selectedIds: (string | number)[]) => void;
  onRowClick?: (row: T) => void;
  emptyText?: string;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
};

function compareValues(left: unknown, right: unknown): number {
  if (left === right) return 0;
  if (left == null) return 1;
  if (right == null) return -1;
  if (typeof left === "number" && typeof right === "number") return left - right;
  return String(left).localeCompare(String(right), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export function DataTable<T extends object>({
  data,
  columns,
  rowKey,
  sort: controlledSort,
  defaultSort = null,
  onSortChange,
  searchable = true,
  searchPlaceholder = "Search...",
  pageSize = 10,
  selectable = false,
  selected: controlledSelected,
  defaultSelected = [],
  onSelectionChange,
  onRowClick,
  emptyText = "No data available",
  loading = false,
  className,
  style,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [internalSort, setInternalSort] = useState<DataTableSort | null>(defaultSort);
  const sort = controlledSort !== undefined ? controlledSort : internalSort;

  const [internalSelected, setInternalSelected] = useState<(string | number)[]>(defaultSelected);
  const selected = controlledSelected ?? internalSelected;

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const rows =
      term === ""
        ? data
        : data.filter((row) =>
            columns.some((column) =>
              String(column.accessor(row) ?? "")
                .toLowerCase()
                .includes(term),
            ),
          );
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column) return rows;
    const next = [...rows];
    next.sort((a, b) => {
      const result = compareValues(column.accessor(a), column.accessor(b));
      return sort.direction === "asc" ? result : -result;
    });
    return next;
  }, [data, columns, search, sort]);

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    useTablePagination(filtered, pageSize);

  const toggleSort = (key: string) => {
    let next: DataTableSort | null;
    if (!sort || sort.key !== key) next = { key, direction: "asc" };
    else if (sort.direction === "asc") next = { key, direction: "desc" };
    else next = null;
    if (controlledSort === undefined) setInternalSort(next);
    onSortChange?.(next);
  };

  const toggleRow = (row: T, index: number) => {
    const id = rowKey(row, index);
    const next = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    if (controlledSelected === undefined) setInternalSelected(next);
    onSelectionChange?.(
      data.filter((_, i) => next.includes(rowKey(data[i], i))),
      next,
    );
  };

  // Adapter for the shared selection hook used by the header checkbox.
  const togglePage = () => {
    const pageIds = paginatedData.map((row) => rowKey(row, data.indexOf(row)));
    const allSelected = pageIds.every((id) => selected.includes(id));
    const next = allSelected
      ? selected.filter((id) => !pageIds.includes(id))
      : [...selected, ...pageIds.filter((id) => !selected.includes(id))];
    if (controlledSelected === undefined) setInternalSelected(next);
    onSelectionChange?.(
      data.filter((_, i) => next.includes(rowKey(data[i], i))),
      next,
    );
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-sm",
        className,
      )}
      style={style}
    >
      {searchable ? (
        <div className="border-b border-border p-4">
          <div className="relative max-w-xs">
            <Search
              size={18}
              aria-hidden
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              aria-label="Search table"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-md border border-border bg-surface py-2 pr-3 pl-10 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:outline-none"
            />
          </div>
        </div>
      ) : null}

      <div className="relative overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              {selectable ? (
                <th className="w-12 px-6 py-3">
                  <button
                    type="button"
                    aria-label="Select all rows on this page"
                    onClick={togglePage}
                  >
                    {paginatedData.length > 0 &&
                    paginatedData.every((row) =>
                      selected.includes(rowKey(row, data.indexOf(row))),
                    ) ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-primary text-primary-foreground">
                        <Check size={12} />
                      </span>
                    ) : (
                      <Square size={16} className="text-muted-foreground" />
                    )}
                  </button>
                </th>
              ) : null}
              {columns.map((column) => (
                <th
                  key={column.key}
                  aria-sort={
                    sort?.key === column.key
                      ? sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase",
                    column.sortable && "cursor-pointer hover:bg-muted",
                    column.className,
                  )}
                  onClick={() => column.sortable && toggleSort(column.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {column.header}
                    {column.sortable ? (
                      sort?.key === column.key && sort.direction === "asc" ? (
                        <ArrowUp size={14} className="text-primary" aria-hidden />
                      ) : sort?.key === column.key && sort.direction === "desc" ? (
                        <ArrowDown size={14} className="text-primary" aria-hidden />
                      ) : (
                        <ArrowUpDown size={14} aria-hidden />
                      )
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-6 py-8 text-center text-sm text-muted-foreground"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const index = data.indexOf(row);
                const id = rowKey(row, index);
                return (
                  <tr key={String(id)} className="hover:bg-muted/60">
                    {selectable ? (
                      <td className="w-12 px-6 py-4">
                        <button
                          type="button"
                          aria-label="Select row"
                          onClick={() => toggleRow(row, index)}
                        >
                          {selected.includes(id) ? (
                            <span className="flex h-4 w-4 items-center justify-center rounded bg-primary text-primary-foreground">
                              <Check size={12} />
                            </span>
                          ) : (
                            <Square size={16} className="text-muted-foreground" />
                          )}
                        </button>
                      </td>
                    ) : null}
                    {columns.map((column) => {
                      const value = column.accessor(row);
                      return (
                        <td
                          key={column.key}
                          className={cn(
                            "px-6 py-4 text-sm whitespace-nowrap",
                            column.className,
                          )}
                          onClick={() => onRowClick?.(row)}
                        >
                          {column.render
                            ? column.render(value, row)
                            : String(value ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {loading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/70">
            <Spinner size="lg" />
          </div>
        ) : null}
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}{" "}
            results
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default DataTable;
