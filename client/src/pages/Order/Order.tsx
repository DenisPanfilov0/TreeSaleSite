import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $user, setUser, resetUser } from '../../Store/Store';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Typography,
} from 'antd';

import { useUnit } from 'effector-react';
import {
  $isLoading,
  createOrder,
} from './store';

import { IOrder } from './types';

const { TextArea } = Input;

const Order: React.FC = () => {
  const user = useStore($user)!;

  const navigate = useNavigate();


  const location = useLocation();
  const { product } = location.state || {};
  const isLoading = useUnit($isLoading);
  
  const [selectedService, setSelectedService] = useState<string>('logs');
  const [totalCostWithService, setTotalCostWithService] = useState<number>(product?.costLogs || 0);

  const [form] = Form.useForm();
  const quality = Form.useWatch('amount', form)

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    const quantity = form.getFieldValue('amount') || 0;
    setTotalCostWithService((value === 'logs' ? product?.costLogs || 0 : product?.costChoppedWood || 0));
  };


  const [finalPrice, setFinalPrice] = useState<number>(0);
  

  useEffect(() => {
    setFinalPrice(quality * totalCostWithService);
  }, [quality, totalCostWithService]);

 
  const onFinish = async (values: IOrder) => createOrder({...values, finalPrice, user_id: user?._id});



  const handlePlaceOrder = () => {
    form
      .validateFields(['amount'])
      .then((values) => {

      })
      .catch((errorInfo) => {
        console.error('Validation failed:', errorInfo);
      });
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        initialValues={{ productName: product.name }}
      >


        <Form.Item label="Имя" name="firstName">
          <Input />
        </Form.Item>

        <Form.Item label="Фамилия" name="lastName">
          <Input />
        </Form.Item>

        <Form.Item label="Отчество" name="middleName">
          <Input />
        </Form.Item>

        <Form.Item label="Адрес доставки" name="deliveryAddress">
          <Input />
        </Form.Item>

        <Form.Item label="Номер Телефона" name="phoneNumber">
          <Input />
        </Form.Item>

        <Form.Item label="Дата Доставки" name="deliveryDate">
          <DatePicker
            showTime={false} 
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item label="Товар" name="productName">
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Количество"
          name="amount" 
          rules={[
          {
            required: true,
            message: 'Пожалуйста, введите количество товара!',
          },
          ]}>
          <InputNumber
            formatter={(value) => (value ? `${value}` : '')}
            parser={(value: any) => (value ? Number(value.replace(/\D/g, '')) : 0)}
          />
        </Form.Item>

        <Form.Item label="Доп. услуги" name="additionalService">
          <Radio.Group onChange={(e) => handleServiceChange(e.target.value)} value={selectedService}>
            {product?.costLogs && (
            <Radio value="logs"> В чурках ({product.costLogs}$) </Radio>
            )}
            {product?.costChoppedWood && (
            <Radio value="firewood"> Колотые ({product.costChoppedWood}$) </Radio>
            )}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Коментарий" name="comment">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Способ оплаты" name="paymentMethod">
          <Radio.Group>
            <Radio value="cash"> Наличными </Radio>
            <Radio value="non-cash" disabled={true}> Безналичный </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Конечная цена" name="finalPrice">
          <Typography.Text style={{ fontSize: '16px', lineHeight: '32px', fontWeight: 'bold' }}>
            {finalPrice} рублей
          </Typography.Text>
        </Form.Item>

        <Form.Item label=" " colon={false}>
            <Button type="primary" /*onClick={() => onFinish(values)}*/htmlType="submit" loading={isLoading}>Оформить заказ</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Order;