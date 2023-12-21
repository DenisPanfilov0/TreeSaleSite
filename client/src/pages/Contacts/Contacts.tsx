import React from 'react';
import { Table } from 'antd';


interface Contact {
  key: string;
  city: string;
  workingHours: string;
  website: string;
  phone: string;
}

const columns = [
  {
    title: 'Город',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Режим работы',
    dataIndex: 'workingHours',
    key: 'workingHours',
  },
  {
    title: 'Сайт',
    dataIndex: 'website',
    key: 'website',
    render: (website: string) => <a href={website}>{website}</a>,
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
  },
];

const data: Contact[] = [
  {
    key: '1',
    city: 'Минск',
    workingHours: 'Работаем с 8.00 до 20.00 без выходных',
    website: 'http://buydrovaby.by',
    phone: '+375 29 556 86 96',
  },
];

const ContactTable: React.FC = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false} // Убираем отображение пагинации
    />
  );
};

export default ContactTable;
