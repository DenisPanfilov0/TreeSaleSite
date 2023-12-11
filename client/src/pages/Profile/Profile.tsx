import React, { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import axios from 'axios';
import { Table } from 'antd';
import { IOrder } from '../Order/types';
import { $user } from '../../Store/Store';

const UserProfile: React.FC = () => {
  const user = useUnit($user);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        if (user?._id) {
          const response = await axios.get(`http://localhost:3000/api/orders/${user._id}`);
          const data = response.data;
    
          if (data.success) {
            setOrders(data.orders);
          } else {
            console.error('Error fetching user orders:', data.error);
          }
        }
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchUserOrders();
  }, [user]);

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text: any, record: { lastName: any; firstName: any; middleName: any; }) => {
        const fullName = `${record.lastName} ${record.firstName} ${record.middleName}`;
        return fullName;
      },
    },
    {
      title: 'Номер Телефона',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Адрес доставки',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
    },
    {
      title: 'Дата доставки',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (text: any, record: { deliveryDate: string }) => {
        const dateObject = new Date(record.deliveryDate);
        const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
      },
    },
    {
      title: 'Товар',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Услуга',
      dataIndex: 'additionalService',
      key: 'additionalService',
      render: (additionalService: string) => {
        return additionalService === 'logs' ? 'В чурках' : additionalService === 'firewood' ? 'Колотые' : additionalService;
      },
    },
    {
      title: 'Цена',
      dataIndex: 'finalPrice',
      key: 'finalPrice',
    },
    {
      title: 'Вид оплаты',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (additionalService: string) => {
        return additionalService === 'cash' ? 'Наличные' : additionalService === 'non-cash' ? 'Безналичный' : additionalService;
      },
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Статус',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },
  ];

  return (
    <div>
      <h2>Профиль пользователя</h2>
      {user ? (
        <>
          <p>ID: {user._id}</p>
          <p>Имя пользователя: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Админ: {user.isAdmin ? 'Да' : 'Нет'}</p>
          <h3>Заказы пользователя:</h3>
          {orders.length > 0 ? (
            <Table dataSource={orders} columns={columns} bordered />
          ) : (
            <p>У пользователя нет заказов</p>
          )}
        </>
      ) : (
        <p>Пользователь не вошел в систему</p>
      )}
    </div>
  );
};

export default UserProfile;
