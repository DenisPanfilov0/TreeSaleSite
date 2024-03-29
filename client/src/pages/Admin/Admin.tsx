/*//Этот файл представляет собой компонент React, ответственный за административную панель приложения, 
//отображающую информацию о заказах, и предоставляющий возможность изменять статусы заказов с использованием выпадающего списка, 
//основанный на данных, полученных с сервера через HTTP-запросы с использованием библиотек React, Axios и Ant Design.*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Select, Button, Popover } from 'antd';
import { IOrder } from '../Order/types';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $user } from '../../Store/Store';



const { Option } = Select;


const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const user = useUnit($user);
  const [forceUpdate, setForceUpdate] = useState<number>(0);



  const handleStatusChange = async (value: string, orderId: string) => {
    try {
        console.log('попытка изменить статус');
      const response = await axios.post(`http://localhost:3000/api/update_order_status/${orderId}`, {
        orderStatus: value,
      });
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: value } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/all_orders');
        setForceUpdate((prev) => prev + 1);
        const data = response.data;

        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error('Error fetching all orders:', data.error);
        }
      } catch (error) {
        console.error('Error fetching all orders:', error);
      }
    };

    fetchAllOrders();
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

  const renderCommentPopover = (comment: string) => {
    return (
      <Popover content={comment} title="Комментарий">
        <Button type="link">Комментарий</Button>
      </Popover>
    );
  };

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
      title: 'Дата заказа',
      dataIndex: 'dateCreateOrder',
      key: 'dateCreateOrder',
      // render: (text: any, record: { deliveryDate: string }) => {
      //     // const dateObject = new Date(record.deliveryDate);
      //     // const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
      //     const formattedDate = 
      //     return formattedDate;
      // },
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
      render: (text: any, record: { deliveryAddress: string }) => {
        if (record.deliveryAddress) {
        return record.deliveryAddress;
        } else {
        return 'Самовывоз';
        }
      },
    },
    {
      title: 'Дата доставки',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (text: any, record: { deliveryDate: string }) => {
        if (record.deliveryDate) {
        const dateObject = new Date(record.deliveryDate);
        const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
        } else {
        return 'Самовывоз';
        }
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
        return additionalService === '30' ? 'до 30 км' : additionalService === '60' ? 'до 60 км' : additionalService === '100' ? 'до 100 км' : "Самовывоз";
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
        render: (text: any, record: IOrder) => (
          <Select
            defaultValue={record.orderStatus}
            style={{ width: 300 }}
            dropdownStyle={{ minWidth: 120, width: 'auto' }}
            onChange={(value) => handleStatusChange(value, record._id)}
          >
            <Option value="Заказ оформлен и оплачен. Ожидается доставка">Заказ оформлен и оплачен. Ожидается доставка</Option>
            <Option value="Заказ оформлен. Ожидается доставка. Оплата наличными водителю">Заказ оформлен. Ожидается доставка. Оплата наличными водителю</Option>
            <Option value="Заказ отменен">Заказ отменен</Option>
            <Option value="Заказ на редактировании">Заказ на редактировании</Option>
            <Option value="Заказ доставлен">Заказ доставлен</Option>
          </Select>
        ),
      },
  ];

  return (
    <div>
      <h2>Админ-панель</h2>
      <h3>Все заказы:</h3>
      {orders.length > 0 ? (
        <Table dataSource={orders} columns={columns} bordered scroll={{ x: 'max-content' }} />
      ) : (
        <p>Нет доступных заказов</p>
      )}
    </div>
  );
};

export default AdminPanel;
