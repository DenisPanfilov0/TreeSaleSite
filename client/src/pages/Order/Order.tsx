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
  Modal,
} from 'antd';

import { useUnit } from 'effector-react';
import InputMask from 'react-input-mask';
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

  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const handleDeliveryChange = (value: string) => {
    switch (value) {
      case '30':
        setDeliveryCost(40);
        break;
      case '60':
        setDeliveryCost(60);
        break;
      case '100':
        setDeliveryCost(80);
        break;
      default:
        setDeliveryCost(0);
        break;
    }
  };


  const [finalPrice, setFinalPrice] = useState<number>(0);
  

  useEffect(() => {
    setFinalPrice(quality * totalCostWithService + deliveryCost);
  }, [quality, totalCostWithService, deliveryCost]);

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

 
  const onFinish = async (values: IOrder) => { createOrder({...values, finalPrice, user_id: user?._id, product_id: product.id}); navigate('/profile')}


  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  const formatCardNumber = (input: string) => {
    const formattedInput = input.replace(/\D/g, '').slice(0, 16);
    let result = '';

    for (let i = 0; i < formattedInput.length; i += 4) {
      result += formattedInput.slice(i, i + 4) + ' ';
    }

    setCardNumber(result.trim());
  };

  const formatExpiryDate = (input: string) => {
    const formattedInput = input.replace(/\D/g, '').slice(0, 4);

    if (formattedInput.length > 2) {
      setExpiryDate(`${formattedInput.slice(0, 2)}/${formattedInput.slice(2)}`);
    } else {
      setExpiryDate(formattedInput);
    }
  };

  const formatCvv = (input: string) => {
    const formattedInput = input.replace(/\D/g, '').slice(0, 3);
    setCvv(formattedInput);
  };

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
        labelCol={{ span: 7 }}
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

        <Form.Item label="Стоимость доставки" name="deliveryCost">
          <Radio.Group onChange={(e) => handleDeliveryChange(e.target.value)}>
            <Radio value="30"> до 30км + 40р </Radio>
            <Radio value="60"> до 60км + 60р  </Radio>
            <Radio value="100"> до 100км + 80р </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Коментарий" name="comment">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Способ оплаты" name="paymentMethod">
          <Radio.Group>
            <Radio value="cash" onChange={() => setIsPaymentVisible(false)}> Наличными </Radio>
            <Radio value="non-cash" onChange={() => setIsPaymentVisible(true)}> Безналичный </Radio>
          </Radio.Group>
        </Form.Item>

        {isPaymentVisible && (
          <>
            <Form.Item label="Номер карты">
        <Input
          placeholder="Номер карты"
          value={cardNumber}
          onChange={(e) => formatCardNumber(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Срок действия">
        <Input
          placeholder="Срок действия"
          value={expiryDate}
          onChange={(e) => formatExpiryDate(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="CVV">
        <Input
          placeholder="CVV"
          value={cvv}
          onChange={(e) => formatCvv(e.target.value)}
        />
      </Form.Item>
          </>
        )}

        <Form.Item label="Серия и номер паспорта" name="passportSeriesNumber">
          <Input />
        </Form.Item>

        <Form.Item label="Где и кем выдан паспорт" name="passportIssuedBy">
          <Input />
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