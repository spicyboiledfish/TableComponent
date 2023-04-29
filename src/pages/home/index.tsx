import React from 'react';
import Table from '@/components/table';
import { ColumnType, TableProps } from '@/components/table/interface';

interface recordsParams {
  id?: number;
  name: string;
  age: number;
  score: number;
  email: string;
  phone: string;
  gender: string;
}
const Home = () => {
  const records: recordsParams[] = [{
    id: 1,
    name: 'Lea Skei',
    age: 32,
    score: 98,
    email: 'lea.skei@example.com',
    gender: 'male',
    phone: '18889898989'
  }, {
    id: 2,
    name: 'Freya Reitz',
    age: 30,
    score: 97,
    email: 'freya.reitz@example.com',
    gender: 'male',
    phone: '18889898980'
  }, {
    id: 3,
    name: 'Ezra Taylor',
    age: 32,
    score: 99,
    email: 'ezra.taylor@example.com',
    gender: 'female',
    phone: '18889898981'
  }, {
    id: 4,
    name: 'Sheila Larson',
    age: 33,
    score: 90,
    email: 'sheila.larson@example.com',
    gender: 'female',
    phone: '18889898982'
  }, {
    id: 5,
    name: 'Annie Sveen',
    age: 32,
    score: 98,
    email: 'annie.sveen@example.com',
    gender: 'female',
    phone: '18889898983'
  }, {
    id: 6,
    name: 'Paraskoviya Zhigalko	',
    age: 36,
    score: 98,
    email: 'paraskoviya.zhigalko@example.com',
    gender: 'female',
    phone: '18889898984'
  }, {
    id: 7,
    name: 'Eli Hughes',
    age: 37,
    score: 99,
    email: 'eli.hughes@example.com',
    gender: 'male',
    phone: '18889898985'
  }, {
    id: 8,
    name: 'Patricia Ortega',
    age: 31,
    score: 90,
    email: 'patricia.ortega@example.com',
    gender: 'female',
    phone: '18889898989'
  }, {
    id: 9,
    name: 'Colin Brække',
    age: 32,
    score: 98,
    email: 'colin.braekke@example.com',
    gender: 'male',
    phone: '18889898989'
  }];
    
  const columns: ColumnType[] = [{
    dataKey: 'name',
    title: 'Name',
    width: 120,
    fixed: true
  }, {
    dataKey: 'age',
    title: 'Age',
    width: 120,
    align: 'center',
    render: (item) => <div>{item}</div>
  }, {
    dataKey: 'score',
    title: 'Score',
    width: 140,
    align: 'center',
    className: 'amount',
  }, {
    dataKey: 'phone',
    title: 'Phone',
    width: 150,
    align: 'center',
  }, {
    dataKey: 'gender',
    title: 'Gender',
    width: 140
  }, {
    dataKey: 'email',
    title: 'Email',
    width: 280,
    fixed: true
  }];
    
  return (
    <div style={{padding: 15}}>
      <Table
        width={800}
        height={300}
        columns={columns}
        dataSource={records}
      />
    </div>
  );
};

export default Home;