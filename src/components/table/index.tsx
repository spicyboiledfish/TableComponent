import React, { useRef } from 'react';
import { AlignType, TableProps, ColumnType } from './interface';

import './index.less';

const ScrollableTable = (props: TableProps) => {
  const style: React.CSSProperties = props.style || {};
  const maxHeight: string = props.width ? (props.height + 'px') : 'unset';
  const columns: ColumnType[] = props.columns || [];
  const dataSource = props.dataSource || [];

  let maxWidth = 0;
  if (props.width) style.width = props.width;
  if (columns.length === 0) {
    columns.push({
      dataKey: 'key'
    });
  }
  columns.forEach((column: ColumnType) => {
    const width: number = column.width || 50;
    maxWidth += width;
  });

  const fixedColumns: number[][] = getFixedColumns(columns);
  const leftFixedColumns: number[] = fixedColumns[0];
  const rightFixedColumns: number[] = fixedColumns[1];

  const tableBody = useRef(null);
  const handleScroll = (target: HTMLElement) => {
    const scrollLeft: number = target.scrollLeft;
    const tableHeaders = target?.parentElement?.getElementsByClassName('st-table-header');
    if (tableHeaders && tableHeaders.length > 0) {
      tableHeaders[0].scrollLeft = scrollLeft;
    }
  };

  return (
    <div
      className={classNames('st-table-container', props.className)}
      style={style}
    >
      <div className="st-table-header">
        <table>
          <colgroup>
            {
              renderCols(columns)
            }
          </colgroup>
          <thead className="st-table-thead">
            <tr>
              {
                columns.map((column: ColumnType, index: number) => {
                  const align: AlignType | undefined = column.align || undefined;
                  const title: React.ReactNode = column.title || '';
                  const fixed: string = leftFixedColumns.includes(index) ? 'left' : (rightFixedColumns.includes(index) ? 'right' : '');
                  const fixedClassName: string = fixed ? ('st-table-cell-fix-' + fixed) : '';
                  return (
                    <th
                      key={index}
                      className={classNames('st-table-cell', fixedClassName, column.className)}
                      style={{textAlign: align}}
                    >
                      {title}
                    </th>
                  );
                })
              }
            </tr>
          </thead>
        </table>
      </div>
      <div
        ref={tableBody}
        className="st-table-body"
        style={{maxHeight: maxHeight}}
        onScroll={(e) => handleScroll(e.currentTarget)}
      >
        <table style={{width: maxWidth, minWidth: '100%'}}>
          <colgroup>
            {
              renderCols(columns)
            }
          </colgroup>
          <tbody className="st-table-tbody">
            {
              dataSource.map((record, index) => (
                <tr key={index} className="st-table-row">
                  {
                    renderCells(columns, leftFixedColumns, rightFixedColumns, record, index)
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

function classNames(...names: (string | undefined)[]) {
  const currentNames: string[] = [];
  names.forEach((name: (string | undefined)) => {
    if (name) currentNames.push(name);
  });
  return currentNames.join(' ');
}

function getFixedColumns(columns: ColumnType[]) {
  const total: number = columns.length;
  const leftFixedColumns: number[] = [];
  const rightFixedColumns: number[] = [];
  if (columns[0].fixed) {
    for (let i = 0; i < total; i++) {
      if (columns[i].fixed) {
        leftFixedColumns.push(i);
      } else {
        break;
      }
    }
  }
  if (columns[total - 1].fixed) {
    for (let i = total - 1; i >= 0; i--) {
      if (columns[i].fixed) {
        if (!leftFixedColumns.includes(i)) rightFixedColumns.push(i);
      } else {
        break;
      }
    }
  }
  return [leftFixedColumns, rightFixedColumns];
}

function renderCols(columns: ColumnType[]) {
  return columns.map((column: ColumnType, index: number) => {
    const width: number = column.width || 50;
    return (
      <col
        key={index}
        style={{width: width, minWidth: width}}
      />
    );
  });
}

function renderCells(columns: ColumnType[], leftFixedColumns: number[], rightFixedColumns: number[], record: any, index: number) {
  return columns.map((column: ColumnType, index: number) => {
    const align: AlignType | undefined = column.align || undefined;
    const fixed: string = leftFixedColumns.includes(index) ? 'left' : (rightFixedColumns.includes(index) ? 'right' : '');
    const className: string = classNames('st-table-cell', column.className, fixed ? ('st-table-cell-fix-' + fixed) : '');
    const rawValue = (column.dataKey && column.dataKey in record) ? record[column.dataKey] : undefined;
    let value = undefined;
    if (column.render) {
      value = column.render(rawValue, record, index);
    } else {
      value = (rawValue === undefined || rawValue === null) ? '' : String(rawValue);
    }
    return (
      <td
        key={index}
        className={className}
        style={{textAlign: align}}
      >
        {value}
      </td>
    );
  });
}

export default ScrollableTable;