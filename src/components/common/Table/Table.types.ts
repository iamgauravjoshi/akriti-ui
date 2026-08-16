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
