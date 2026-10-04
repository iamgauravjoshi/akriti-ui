import { useState, type ReactNode } from "react";
import {
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUpDown,
  Check,
  Search,
  Square,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "../buttons/Button";
import { Spinner } from "../feedback/Spinner";
import {
  getRowId,
  useTableFilter,
  useTablePagination,
  useTableSelection,
  useTableSort,
} from "./useTable";

export type TableColumn<T extends object> = {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  clickable?: boolean;
  render?: (value: unknown, record: T, index: number) => ReactNode;
  className?: string;
  width?: string;
};

export type TableProps<T extends object> = {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[], selectedIds: (string | number)[]) => void;
  onRowClick?: (record: T, index: number) => void;
  rowKey?: keyof T | ((row: T) => string | number);
  loading?: boolean;
  error?: boolean | ReactNode;
  emptyText?: string;
  emptyState?: ReactNode;
  pageSize?: number;
  showSearch?: boolean;
  showFilter?: boolean;
};

export function Table<T extends object>({
  columns,
  data,
  className,
  selectable = false,
  onSelectionChange,
  onRowClick,
  rowKey = "id" as keyof T,
  loading = false,
  error,
  emptyText = "No data available",
  emptyState,
  pageSize = 10,
  showSearch = true,
  showFilter = false,
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { sortedData, sortConfig, toggleSort } = useTableSort(data);
  const filteredData = useTableFilter(sortedData, searchTerm, filters);
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    useTablePagination(filteredData, pageSize);
  const { selectedIds, toggleRow, togglePage } = useTableSelection(
    data,
    rowKey,
    onSelectionChange,
  );

  const empty = emptyState ?? (
    <div className="py-8 text-center text-muted-foreground">{emptyText}</div>
  );

  if (error && !loading) {
    return (
      <div className={cn("rounded-xl border border-danger bg-danger-subtle p-6 text-danger", className)}>
        {typeof error === "boolean" ? "Unable to load data." : error}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-sm", className)}>
      {(showSearch || showFilter) && (
        <div className="border-b border-border p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {showSearch ? (
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full max-w-xs rounded-md border border-border bg-surface py-2 pr-3 pl-10 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:outline-none"
                />
              </div>
            ) : null}
            {showFilter ? (
              <div className="flex flex-wrap gap-2">
                {columns
                  .filter((column) => column.filterable)
                  .map((column) => (
                    <input
                      key={column.key}
                      type="search"
                      placeholder={`Filter ${column.title}`}
                      value={filters[column.key] || ""}
                      onChange={(event) => {
                        setFilters((prev) => ({
                          ...prev,
                          [column.key]: event.target.value,
                        }));
                        setCurrentPage(1);
                      }}
                      className="w-36 rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-focus/40 focus-visible:outline-none"
                    />
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      )}

      <div className="space-y-4 p-4 md:hidden">
        {paginatedData.length === 0
          ? empty
          : paginatedData.map((item, index) => {
              const id = getRowId(item, rowKey, data.indexOf(item));
              return (
                <div key={String(id)} className="rounded-xl border border-border p-4">
                  {selectable ? (
                    <button
                      type="button"
                      className="mb-3"
                      onClick={() => toggleRow(item)}
                      aria-label="Select row"
                    >
                      {selectedIds.has(id) ? (
                        <span className="flex h-4 w-4 items-center justify-center rounded bg-primary text-primary-foreground">
                          <Check size={12} />
                        </span>
                      ) : (
                        <Square size={16} className="text-muted-foreground" />
                      )}
                    </button>
                  ) : null}
                  <div className="space-y-3">
                    {columns.map((column) => {
                      if (column.key === "actions") return null;
                      const value = (item as Record<string, unknown>)[column.key];
                      return (
                        <div key={column.key} className="flex justify-between gap-3 text-sm">
                          <span className="text-muted-foreground">{column.title}</span>
                          <div
                            className={cn(
                              column.clickable && "cursor-pointer text-primary hover:underline",
                            )}
                            onClick={() => column.clickable && onRowClick?.(item, index)}
                          >
                            {column.render ? column.render(value, item, index) : String(value ?? "")}
                          </div>
                        </div>
                      );
                    })}
                    {columns.find((column) => column.key === "actions")?.render?.(
                      undefined,
                      item,
                      index,
                    )}
                  </div>
                </div>
              );
            })}
      </div>

      <div className="relative hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              {selectable ? (
                <th className="w-12 px-6 py-3">
                  <button
                    type="button"
                    onClick={() => togglePage(paginatedData)}
                    aria-label="Select all rows on this page"
                  >
                    {paginatedData.length > 0 &&
                    paginatedData.every((row) =>
                      selectedIds.has(getRowId(row, rowKey, data.indexOf(row))),
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
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase",
                    column.sortable && "cursor-pointer hover:bg-muted",
                    column.className,
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && toggleSort(column.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {column.title}
                    {column.sortable ? (
                      sortConfig.key === column.key && sortConfig.direction === "asc" ? (
                        <ArrowDownAZ className="h-4 w-4 text-primary" />
                      ) : sortConfig.key === column.key && sortConfig.direction === "desc" ? (
                        <ArrowDownZA className="h-4 w-4 text-primary" />
                      ) : (
                        <ArrowUpDown className="h-4 w-4" />
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
                <td colSpan={columns.length + (selectable ? 1 : 0)}>{empty}</td>
              </tr>
            ) : (
              paginatedData.map((record, index) => {
                const id = getRowId(record, rowKey, data.indexOf(record));
                return (
                  <tr key={String(id)} className="hover:bg-muted/60">
                    {selectable ? (
                      <td className="w-12 px-6 py-4">
                        <button type="button" onClick={() => toggleRow(record)} aria-label="Select row">
                          {selectedIds.has(id) ? (
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
                      const value = (record as Record<string, unknown>)[column.key];
                      return (
                        <td
                          key={column.key}
                          className={cn(
                            "px-6 py-4 text-sm whitespace-nowrap",
                            column.clickable && "cursor-pointer font-medium text-primary hover:underline",
                            column.className,
                          )}
                          onClick={() => column.clickable && onRowClick?.(record, index)}
                        >
                          {column.render ? column.render(value, record, index) : String(value ?? "")}
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
            {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length}{" "}
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

export default Table;
