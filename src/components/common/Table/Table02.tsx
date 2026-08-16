import React, { useState, useMemo } from "react";
import {
  Search,
  Check,
  Square,
  ArrowUpDown,
  ArrowDownAZ,
  ArrowDownZA,
} from "lucide-react";
import { Button } from "../Buttons/Buttons";
import { RingSpinner } from "../Loaders/LoadingSpinners";

export interface TableColumn<T = any> {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  clickable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  className?: string;
  width?: string;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  selectable?: boolean;
  onSelectionChange?: (
    selectedRows: T[],
    selectedIds: (string | number)[]
  ) => void;
  onRowClick?: (record: T, index: number) => void;
  rowKey?: string;
  loading?: boolean;
  emptyText?: string;
  pageSize?: number;
  showSearch?: boolean;
  showFilter?: boolean;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc" | null;
}

const Table02: React.FC<TableProps> = ({
  columns,
  data,
  className = "",
  selectable = false,
  onSelectionChange,
  onRowClick,
  rowKey = "id",
  loading = false,
  emptyText = "No data available",
  pageSize = 10,
  showSearch = true,
  showFilter = false,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: null,
  });
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  console.log("sortConfig: ", sortConfig);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sorting logic
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = useMemo(() => {
    return sortedData.filter((item) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Column filters
      const matchesFilters = Object.entries(filters).every(
        ([key, filterValue]) => {
          if (!filterValue) return true;
          return String(item[key])
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        }
      );

      return matchesSearch && matchesFilters;
    });
  }, [sortedData, searchTerm, filters]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey);
    console.log("column: ", column);

    if (!column?.sortable) return;

    let direction: "asc" | "desc" | null = "asc";
    if (
      sortConfig &&
      sortConfig.key === columnKey &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    } else if (
      sortConfig.key === columnKey &&
      sortConfig.direction === "desc"
    ) {
      direction = null;
    }

    setSortConfig({ key: columnKey, direction });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
      onSelectionChange?.([], []);
    } else {
      const allIds = new Set(paginatedData.map((item) => item[rowKey]));
      setSelectedRows(allIds);
      onSelectionChange?.(paginatedData, Array.from(allIds));
    }
  };

  const handleSelectRow = (item: any) => {
    const id = item[rowKey];
    const newSelected = new Set(selectedRows);

    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }

    setSelectedRows(newSelected);
    const selectedItems = data.filter((dataItem) =>
      newSelected.has(dataItem[rowKey])
    );
    onSelectionChange?.(selectedItems, Array.from(newSelected));
  };

  const handleCellClick = (column: TableColumn, record: any, index: number) => {
    if (column.clickable && onRowClick) {
      onRowClick(record, index);
    }
  };

  // Mobile Card Component
  const MobileCard: React.FC<{ item: any; index: number }> = ({
    item,
    index,
  }) => (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white/5 p-4 text-white shadow-sm backdrop-blur-sm">
      {selectable && (
        <div className="mb-3 flex items-center">
          <button
            onClick={() => handleSelectRow(item)}
            className="rounded p-1 hover:bg-white/20"
          >
            {selectedRows.has(item[rowKey]) ? (
              <div className="flex h-4 w-4 items-center justify-center rounded bg-blue-600">
                <Check size={12} className="text-white" />
              </div>
            ) : (
              <Square size={16} className="text-white/40" />
            )}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {columns.map((column, index) => {
          if (column.key === "actions") return null;

          return (
            <div key={column.key} className="flex items-start justify-between">
              <span className="mr-3 min-w-0 flex-shrink-0 text-sm font-medium text-white/70">
                {column.title}:
              </span>
              <div
                className={`text-right text-sm text-white ${
                  column.clickable
                    ? "cursor-pointer text-blue-600 hover:underline"
                    : ""
                }`}
                onClick={() =>
                  column.clickable && handleCellClick(column, item, index)
                }
              >
                {column.render
                  ? column.render(item[column.key], item, index)
                  : item[column.key]}
              </div>
            </div>
          );
        })}

        {/* Actions for mobile */}
        {columns.find((col) => col.key === "actions") && (
          <div className="border-t border-gray-100 pt-3">
            <div className="flex justify-end space-x-2">
              {columns
                .find((col) => col.key === "actions")
                ?.render?.(null, item, index)}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // if (loading) {
  //   return <RingSpinner />;
  // }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-md backdrop-blur-md ${className}`}
    >
      {/* Header with Search and Filters */}
      {(showSearch || showFilter) && (
        <div className="border-b border-gray-200 p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {showSearch && (
              <div className="flex-1">
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute top-1/2 left-3 -translate-y-1/2 transform text-white/40"
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-65 rounded-lg border border-white/30 bg-white/10 py-2 pr-4 pl-10 text-white placeholder-white/60 outline-none focus:border-white focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
            )}

            {showFilter && (
              <div className="flex gap-2">
                {columns
                  .filter((col) => col.filterable)
                  .map((column, index) => (
                    <div key={column.key} className="relative">
                      <input
                        type="text"
                        placeholder={`Filter ${column.title}`}
                        value={filters[column.key] || ""}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            [column.key]: e.target.value,
                          }))
                        }
                        className="w-32 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white"
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile View */}
      {isMobile ? (
        <div className="p-4">
          {paginatedData.length === 0 ? (
            <div className="py-8 text-center text-white/70">{emptyText}</div>
          ) : (
            paginatedData.map((item, index) => (
              <MobileCard key={item[rowKey]} item={item} index={index} />
            ))
          )}
        </div>
      ) : (
        /* Desktop Table View */
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white/10">
              <tr>
                {selectable && (
                  <th className="w-12 px-6 py-3">
                    <button
                      onClick={handleSelectAll}
                      className="rounded p-1 hover:bg-gray-200"
                    >
                      {selectedRows.size === paginatedData.length &&
                      paginatedData.length > 0 ? (
                        <div className="flex h-4 w-4 items-center justify-center rounded bg-blue-600">
                          <Check size={12} className="text-white" />
                        </div>
                      ) : (
                        <Square size={16} className="text-white/40" />
                      )}
                    </button>
                  </th>
                )}

                {columns.map((column, index) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-left text-xs font-medium tracking-wider text-white/80 uppercase ${
                      column.sortable ? "cursor-pointer hover:bg-white/20" : ""
                    } ${column.className || ""}`}
                    style={{ width: column.width }}
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.title}</span>

                      {column.sortable && (
                        <div className="flex flex-col">
                          {sortConfig.key === column.key ? (
                            sortConfig.direction === "asc" ? (
                              <ArrowDownAZ className="h-4 w-4 text-white" />
                            ) : sortConfig.direction === "desc" ? (
                              <ArrowDownZA className="h-4 w-4 text-white" />
                            ) : (
                              <ArrowUpDown className="h-4 w-4 text-white/70" />
                            )
                          ) : (
                            <ArrowUpDown className="h-4 w-4 text-white/70" />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-white/80">
              {paginatedData.length === 0 ? (
                <tr key={emptyText}>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="px-6 py-8 text-center text-white/70"
                  >
                    {emptyText}
                  </td>
                </tr>
              ) : (
                paginatedData.map((record, index) => (
                  <tr
                    key={record[rowKey]}
                    className="transition-colors hover:bg-white/20"
                  >
                    {selectable && (
                      <td className="w-12 px-6 py-4">
                        <button
                          onClick={() => handleSelectRow(record)}
                          className="rounded p-1 hover:bg-gray-200"
                        >
                          {selectedRows.has(record[rowKey]) ? (
                            <div className="flex h-4 w-4 items-center justify-center rounded bg-blue-600">
                              <Check size={12} className="text-white" />
                            </div>
                          ) : (
                            <Square size={16} className="text-white/40" />
                          )}
                        </button>
                      </td>
                    )}

                    {columns.map((column, index) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 text-sm whitespace-nowrap ${
                          column.clickable
                            ? "cursor-pointer font-medium text-white/70 underline hover:underline"
                            : ""
                        } ${column.className || ""}`}
                        onClick={() => handleCellClick(column, record, index)}
                      >
                        {column.render
                          ? column.render(record[column.key], record, index)
                          : record[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {loading && (
            <div className="bg-opacity-70 absolute inset-0 z-10 flex items-center justify-center bg-white">
              <RingSpinner />
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
            {filteredData.length} results
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table02;
