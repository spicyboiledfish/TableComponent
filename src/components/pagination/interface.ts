export interface PaginationProps {
  pageSize: number;
  total: number;
  page: number;
  onChange: (page: number, size: number) => void;
}