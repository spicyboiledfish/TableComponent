import React, { useState } from 'react';
import { PaginationProps } from './interface';
import './index.less';

const Pagination = (props: PaginationProps) => {
  const { pageSize, page, total, onChange } = props;
  return (
    <div className='pagination-container'>
      <span className='total'>
                共有{' '}
        <strong>
          {total}条
        </strong>{' '}
      </span>
            跳转到:{' '}
      <input
        type="number"
        value={page}
        onChange={(e) => {
          e.stopPropagation();
          onChange(Number(e.target.value), pageSize);
        }}
        style={{ width: '50px', height: '20px' }}
      />
      <select
        value={pageSize}
        style={{}}
        onChange={e => {
          e.stopPropagation();
          onChange(page, Number(e.target.value));
        }}
      >
        {[10, 20, 50, 100].map(item => (
          <option key={item} value={item}>
            {item}条/页
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;