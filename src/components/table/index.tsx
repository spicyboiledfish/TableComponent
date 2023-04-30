import React, { useRef, useEffect, useState } from 'react';
import { AlignType, TableProps, ColumnType } from './interface';
import Pagination from '../pagination';
import AscendIcon from '@/assets/top.svg'; // 升序
import DescendIcon from '@/assets/bottom.svg'; // 降序
import _ from 'lodash';
import './index.less';

const ScrollableTable = (props: TableProps) => {
  const style: React.CSSProperties = props.style || {};
  const maxHeight: string = props.width ? (props.height + 'px') : 'unset';
  const [columns, setColumns] = useState<ColumnType[]>(props.columns || []);
  const dataSource = props.dataSource || [];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableList, setTableList] = useState([] as any[][]);
  const total = dataSource.length;

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

  useEffect(() => {
    handleData(page, pageSize);
  }, [page, pageSize]);


  const handleData = (page: number, pageSize: number) => {
    const maxPage = Math.ceil((total) / pageSize!);
    const tableList = [];
    for (let i=0; i< maxPage; i++) {
      const arr = [];
      for (let j = 0; j< pageSize; j++) {
        const current = i * pageSize + j;
        current <= dataSource.length - 1 && arr.push(dataSource[current]);
      }
      tableList.push(arr);
    }
    setTableList(tableList);
  };

  const paginationChange = (current: number, size: number) => {
    const maxPage = Math.ceil((total) / pageSize!);
    setPage(current > maxPage ? maxPage : current <= 0 ? 1 : current);
    setPageSize(size);
  };

  const sortFn = (type: string, column: ColumnType, index: number) => {
    const tableListData = _.cloneDeep(tableList);
    const columnsData = _.cloneDeep(columns);
    const current = tableListData[page - 1];
    const key = column.dataKey;
    if (!current || current?.length === 0) return;
    if (!key) return;
    const now = current.sort((a, b) => {
      if (type === 'ascend') {
        columnsData[index].sort = 'dscend';
        if (typeof a[key] === 'number') {
          return a[key] - b[key];
        } else {
          const strA = a[key].toUpperCase();
          const strB = b[key].toUpperCase();
          return strA > strB ? 1 : strA < strB ? -1 : 0;
        }
      } else {
        columnsData[index].sort = 'ascend';
        if (typeof a[key] === 'number') {
          return b[key] - a[key];
        } else {
          const strA = a[key].toUpperCase();
          const strB = b[key].toUpperCase();
          return strA > strB ? -1 : strA < strB ? 1 : 0;
        }
      }
    });
    for (const key in tableListData) {
      if (+key === page - 1) {
        tableListData[page - 1] = now;
      }
    }
    setColumns(columnsData);
    setTableList(tableListData);
  };

  const sortRender = (type: string, column: ColumnType, index: number) => {
    if (!type) return;
    return (
      <div className='sort-container' onClick={() => sortFn(type, column, index)}>
        <img src={AscendIcon} />
        <img src={DescendIcon} />
      </div>
    );
  };

  return (
    <div>
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
                    const sort: string = column.sort || '';
                    return (
                      <th
                        key={index}
                        className={classNames('st-table-cell', fixedClassName, column.className)}
                        style={{textAlign: align}}
                      >
                        {title}
                        {sortRender(sort, column, index)}
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
                tableList && tableList[page - 1] && tableList[page - 1].map((record, index) => (
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
      <Pagination pageSize={pageSize} total={total} page={page} onChange={paginationChange}/>
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
    const previous: number = rightFixedColumns.includes(index) ? index - 1 : 0;
    const className: string = classNames('st-table-cell', column.className, fixed ? ('st-table-cell-fix-' + fixed) : '', previous ? 'right-fixed' : '');
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