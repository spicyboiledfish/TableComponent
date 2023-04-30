export declare type AlignType = 'left' | 'center' | 'right';

export interface ColumnType {
  align?: AlignType;
  className?: string;
  dataKey?: string;
  fixed?: boolean;
  title?: React.ReactNode;
  width?: number;
  sort?: 'ascend' | 'dscend';
  render?: <T>(value: T, record: T, index: number) => React.ReactNode;
}

export interface TableProps {
  className?: string;
  style?: React.CSSProperties;
  columns?: ColumnType[];
  dataSource?: any[];
  width?: number;
  height?: number;
}