import React from 'react';
import Table from '@/components/table';
import { ColumnType, TableProps } from '@/components/table/interface';

interface recordsParams {
  id?: number;
  productName: string;
  amount1: number | object;
  amount2: number | object;
  amount3: number | object;
  currency?: string;
  ca?: string;
}
const Home = () => {
  const records: recordsParams[] = [{
    id: 1,
    productName: '淡泰',
    amount1: 198,
    amount2: 200,
    amount3: 205.5,
    currency: '人民币',
    ca: 'Amy'
  }, {
    productName: '方润',
    amount1: 105.5,
    amount2: 100,
    amount3: 108,
    currency: '港元',
    ca: 'Baby'
  }, {
    productName: '医疗基金-1',
    amount1: 153,
    amount2: 150,
    amount3: 155,
    currency: '人民币',
    ca: 'Emily'
  }, {
    productName: '医疗基金-2',
    amount1: 302,
    amount2: 300,
    amount3: 290,
    currency: '美元',
    ca: 'Baby'
  }, {
    productName: '医疗基金-3',
    amount1: 108.8,
    amount2: 100,
    amount3: 130,
    currency: '人民币',
    ca: 'Amy'
  }, {
    productName: '医疗基金-4',
    amount1: 205,
    amount2: 200,
    amount3: 208,
    currency: '美元',
    ca: '吴丹'
  }, {
    productName: '医疗基金-5',
    amount1: 315.5,
    amount2: 300,
    amount3: 280,
    currency: '人民币',
    ca: 'Baby'
  }, {
    productName: '医疗基金-6',
    amount1: 109,
    amount2: 95,
    amount3: 106,
    currency: '人民币',
    ca: 'Emily'
  }, {
    productName: '恒大私募债',
    amount1: 213,
    amount2: 200,
    amount3: 208,
    currency: '港元',
    ca: '吴丹',
  }];
    
  const columns: ColumnType[] = [{
    dataKey: 'productName',
    title: '产品名称',
    width: 90,
    fixed: true
  }, {
    dataKey: 'amount1',
    title: <React.Fragment>上周缴款金额<br/>（万）</React.Fragment>,
    width: 140,
    align: 'center',
    className: 'amount',
    render: (item) => <div>{item}</div>
  }, {
    dataKey: 'amount2',
    title: <React.Fragment>上周预约金额<br/>（万）</React.Fragment>,
    width: 140,
    align: 'center',
    className: 'amount',
  }, {
    dataKey: 'amount3',
    title: <React.Fragment>待本周跟进金额<br/>（万）</React.Fragment>,
    width: 140,
    align: 'center',
    className: 'amount',
  }, {
    dataKey: 'currency',
    title: '币种',
    width: 80
  }, {
    dataKey: 'ca',
    title: 'CA',
    width: 80,
    fixed: true
  }];
    
  return (
    <div style={{padding: 15}}>
      <Table
        width={500}
        height={300}
        columns={columns}
        dataSource={records}
      />
    </div>
  );
};

export default Home;