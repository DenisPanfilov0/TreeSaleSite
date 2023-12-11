import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  // orderFormChanged,
  // submitOrder,
  $isLoading,
  createOrder,
} from './store';

import { IOrder } from './types';

const { TextArea } = Input;

const Order: React.FC = () => {

  const navigate = useNavigate();


  const location = useLocation();
  const { product } = location.state || {};
  // const orderForm = useUnit($orderForm);
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

  const onFinish = async (values: IOrder) => console.log('была нажата кнопка');


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
      >


        <Form.Item label="Имя">
          <Input />
        </Form.Item>

        <Form.Item label="Фамилия">
          <Input />
        </Form.Item>

        <Form.Item label="Отчество">
          <Input />
        </Form.Item>

        <Form.Item label="Адрес доставки">
          <Input />
        </Form.Item>

        <Form.Item label="Номер Телефона">
          <Input />
        </Form.Item>

        <Form.Item label="Дата Доставки">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Товар">
          <Input value={product.name} readOnly />
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

        <Form.Item label="Доп. услуги">
          <Radio.Group onChange={(e) => handleServiceChange(e.target.value)} value={selectedService}>
            {product?.costLogs && (
            <Radio value="logs"> В чурках ({product.costLogs}$) </Radio>
            )}
            {product?.costChoppedWood && (
            <Radio value="firewood"> Колотые ({product.costChoppedWood}$) </Radio>
            )}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Коментарий">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Способ оплаты">
          <Radio.Group>
            <Radio value="cash"> Наличными </Radio>
            <Radio value="non-cash" disabled={true}> Безналичный </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Конечная цена" name="totalPrice">
          <Typography.Text style={{ fontSize: '16px', lineHeight: '32px', fontWeight: 'bold' }}>
            {quality * totalCostWithService} рублей
          </Typography.Text>
        </Form.Item>

        <Form.Item label=" " colon={false}>
            <Button type="primary" /*onClick={() => onFinish(values)}*/loading={isLoading}>Оформить заказ</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Order;