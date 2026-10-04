import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc" | null;

export type SortConfig = {
  key: string;
  direction: SortDirection;
};

export function getRowId<T extends object>(
  row: T,
  rowKey: keyof T | ((row: T) => string | number),
  fallback?: string | number,
): string | number {
  const id =
    typeof rowKey === "function"
      ? rowKey(row)
      : (row[rowKey] as string | number | undefined);
  return id ?? fallback ?? "";
}

export function useTableSort<T extends object>(data: T[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: null,
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;
    const next = [...data];
    next.sort((a, b) => {
      const left = a[sortConfig.key as keyof T];
      const right = b[sortConfig.key as keyof T];
      if (left === right) return 0;
      if (left == null) return 1;
      if (right == null) return -1;
      const result = String(left).localeCompare(String(right), undefined, {
        numeric: true,
        sensitivity: "base",
      });
      return sortConfig.direction === "asc" ? result : -result;
    });
    return next;
  }, [data, sortConfig]);

  const toggleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      if (prev.direction === "desc") return { key: "", direction: null };
      return { key, direction: "asc" };
    });
  };

  return { sortedData, sortConfig, toggleSort };
}

export function useTableFilter<T extends object>(
  data: T[],
  searchTerm: string,
  filters: Record<string, string>,
) {
  return useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesFilters = Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        return String(item[key as keyof T])
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, filters]);
}

export function useTablePagination<T>(data: T[], pageSize: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
  return {
    currentPage: page,
    setCurrentPage,
    totalPages,
    paginatedData,
  };
}

export function useTableSelection<T extends object>(
  data: T[],
  rowKey: keyof T | ((row: T) => string | number),
  onSelectionChange?: (selectedRows: T[], selectedIds: (string | number)[]) => void,
) {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  const resolveId = (row: T) => getRowId(row, rowKey, data.indexOf(row));

  const toggleRow = (row: T) => {
    const id = resolveId(row);
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
    const selectedRows = data.filter((item) => next.has(resolveId(item)));
    onSelectionChange?.(selectedRows, Array.from(next));
  };

  const togglePage = (pageRows: T[]) => {
    const pageIds = pageRows.map((row) => resolveId(row));
    const allSelected = pageIds.every((id) => selectedIds.has(id));
    const next = new Set(selectedIds);
    if (allSelected) pageIds.forEach((id) => next.delete(id));
    else pageIds.forEach((id) => next.add(id));
    setSelectedIds(next);
    const selectedRows = data.filter((item) => next.has(resolveId(item)));
    onSelectionChange?.(selectedRows, Array.from(next));
  };

  return { selectedIds, toggleRow, togglePage };
}
