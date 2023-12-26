/*//Этот файл представляет собой компонент React, отвечающий за отображение таблицы с контактной информацией, 
//включая город, режим работы, веб-сайт и телефон, используемый для представления данных о контактах 
//на соответствующей странице веб-приложения с использованием библиотеки Ant Design.*/
import React from 'react';
import { Table } from 'antd';
import firstImage from './Maps.jpg'


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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false} // Убираем отображение пагинации
    />
    <img
            src={firstImage} // Замените ссылкой на вашу вторую картинку
            alt="Second Image"
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
          />
    </div>
  );
  
};

export default ContactTable;
