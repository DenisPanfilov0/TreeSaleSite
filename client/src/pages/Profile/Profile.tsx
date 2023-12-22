import React, { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { IOrder } from '../Order/types';
import { $user } from '../../Store/Store';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ContractPage from '../ContractPage';

interface PDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void;
}

const UserProfile: React.FC = () => {
  const user = useUnit($user);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const navigate = useNavigate();
  const [forceUpdate, setForceUpdate] = useState<number>(0);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        if (user?._id) {
          const response = await axios.get(`http://localhost:3000/api/orders/${user._id}`);
          setForceUpdate((prev) => prev + 1);
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
  }, [user, forceUpdate]);

  const handleEditOrder = async (orderId: string) => {
    const response = await axios.get(`http://localhost:3000/api/editOrders/${orderId}`)
    navigate('/editOrder', { state: { order: response.data.order } });
    console.log(response.data)
  };

  const consoleWrite = async (orderId: string) => {
    const response = await axios.get(`http://localhost:3000/api/editOrders/${orderId}`)
    navigate('/ContractPage', { state: { order: response.data.order } });
  }

  const orderDelete = async (orderId: string) => {
    const response = await axios.get(`http://localhost:3000/api/orderDelete/${orderId}`)
    
  }



  // const generatePDF = () => {
  //   // const doc = new jsPDF();
  //   const doc = new jsPDF({
  //     unit: 'mm',
  //     orientation: 'portrait',
  //     format: 'a4',
  //     floatPrecision: 16,
  //   }) as PDFWithAutoTable;
    
  //   const tableData = orders.map(order => Object.values(order));

  //   doc.autoTable({
  //     head: [['ID', 'Имя пользователя', 'Email', 'Админ', /* другие заголовки */]],
  //     body: [
  //       [user?._id, user?.username, user?.email, user?.isAdmin ? 'Yes' : 'No' /* другие данные */],
  //     ],
  //   });

  //   doc.autoTable({
  //     head: [['Действия', 'ФИО', 'Номер Телефона', 'Адрес доставки', 'Дата доставки', /* другие заголовки */]],
  //     body: tableData,
  //   });

  //   doc.save('user_profile.pdf');
  // };

  const columns = [
    {
      title: ' ',
      key: 'actions',
      render: (text: any, record: IOrder) => (
          <Button type='primary' onClick={() => orderDelete(record._id)}>Удалить</Button>
      ),
    },
    {
      title: 'Договор',
      key: 'actions',
      render: (text: any, record: IOrder) => (
          <Button type='primary' onClick={() => consoleWrite(record._id)}>Печать</Button>
      ),
    },
    // {
    //   title: 'Статус',
    //   dataIndex: 'orderStatus',
    //   key: 'orderStatus',
    // },
    {
      title: 'Действия',
      key: 'actions',
      render: (text: any, record: IOrder) => (
        record.orderStatus === 'Заказ на редактировании' ? (
          <Button type="link" onClick={() => handleEditOrder(record._id)}>
            Изменить
          </Button>
        ) : (
          <Button type="link" disabled>
            Изменить
          </Button>
        )
      ),
    },
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
      title: 'Дальность доставки',
      dataIndex: 'deliveryCost',
      key: 'deliveryCost',
      render: (additionalService: string) => {
        return additionalService === '30' ? 'до 30 км' : additionalService === '60' ? 'до 60 км' : additionalService === '100' ? 'до 100 км' : additionalService;
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
            <>
            {/* <Button onClick={*****}>Создать PDF</Button> */}
            <Table dataSource={orders} columns={columns} bordered />
          </>
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
