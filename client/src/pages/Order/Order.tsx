/*//Этот файл отвечает за создание компонента React, представляющего страницу оформления заказа. 
//В нем используются хуки состояния, эффекты и события из библиотеки Effector для управления состоянием 
//и выполнения асинхронных операций, также включает в себя форму для ввода данных заказа, расчета стоимости и выбора способа оплаты.*/
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
import { fetchWoodQuantityFx, updateWoodQuantityFx } from '../WoodCount/store';

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

  const [minDeliveryDate, setMinDeliveryDate] = useState<Date | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<string>();
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); 
    setMinDeliveryDate(today);
  }, []);

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        const quantity = await fetchWoodQuantityFx(product?.name);
        setAvailableQuantity(quantity);
      } catch (error) {
        console.error('Ошибка при получении количества товара:', error);
      }
    };

    updateQuantity();
  }, [product]);

  const disabledDate = (current: any) => {
    if (minDeliveryDate) {
      return current && current < minDeliveryDate;
    }
    return false;
  };

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

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

 
  const onFinish = async (values: IOrder) => {
    try {
      // Проверяем, достаточно ли товара на складе
      const availableQuantity = await fetchWoodQuantityFx(product.name);
      const requestedQuantity = values.amount;
      
      if (requestedQuantity > availableQuantity) {
        // Если товара недостаточно, вы можете вывести сообщение об ошибке
        console.error('Недостаточно товара на складе!');
        return;
      }

      // Уменьшаем количество товара на складе
      await updateWoodQuantityFx({ productName: product.name, newQuantity: availableQuantity - requestedQuantity });

      // Оформляем заказ
      createOrder({
        ...values,
        finalPrice,
        user_id: user?._id,
        product_id: product.id,
        numberCard: cardNumber,
        dateCard: expiryDate,
        cvvCard: cvv,
        dateCreateOrder: formattedDate,
      });

      // Переход на страницу профиля
      navigate('/profile');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
    }
  };
// const onFinish = async (values: IOrder) => {
//   console.log(values);
// }

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
        style={{ maxWidth: 700, paddingTop: '20px' }}
        onFinish={onFinish}
        initialValues={{ productName: product.name, amount: 0, deliveryOption: 'pickup'}}
      >


        <Form.Item label="Фамилия" name="lastName" rules={[{ required: true, message: 'Введите фамилию' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Имя" name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Отчество" name="middleName" rules={[{ required: true, message: 'Введите отчество' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Номер Телефона" name="phoneNumber" rules={[{ required: true, message: 'Введите номер телефона' }]}>
          <Input />
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
              message: 'Введите количество товара!',
            },
          ]}
        >
          <InputNumber
            formatter={(value) => (value ? `${value}` : '')}
            parser={(value: any) => Math.max(0, value ? Number(value.toString().replace(/\D/g, '')) : 0)}
            min={0}
            max={availableQuantity !== null ? availableQuantity : undefined}
          />
        </Form.Item>

        <Form.Item label="Доп. услуги" name="additionalService" rules={[{ required: true, message: 'Выберите доп. услуги' }]}>
          <Radio.Group onChange={(e) => handleServiceChange(e.target.value)} value={selectedService}>
            {product?.costLogs && (
            <Radio value="logs"> В чурках ({product.costLogs}руб) </Radio>
            )}
            {product?.costChoppedWood && (
            <Radio value="firewood"> Колотые ({product.costChoppedWood}руб) </Radio>
            )}
          </Radio.Group>
        </Form.Item>


        <Form.Item label="Способ доставки" name="deliveryOption" rules={[{ required: true, message: 'Выберите способ доставки' }]}>
          <Radio.Group onChange={(e) => setDeliveryOption(e.target.value)} value={deliveryOption}>
            <Radio value="pickup"> Самовывоз </Radio>
            <Radio value="delivery" disabled={quality < 5}>
              Доставка {quality < 5 && <span style={{ color: 'red' }}>Минимальный объем доставки от 5м³</span>}
            </Radio>
          </Radio.Group>
        </Form.Item>

        {deliveryOption === 'delivery' && (
          <>
          <Form.Item label="Адрес доставки" name="deliveryAddress" rules={[{ required: true, message: 'Введите адрес доставки' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Дата Доставки" name="deliveryDate" rules={[{ required: true, message: 'Введите дату доставки' }]}>
            <DatePicker showTime={false} format="YYYY-MM-DD" disabledDate={disabledDate} />
          </Form.Item>

          <Form.Item label="Стоимость доставки" name="deliveryCost" rules={[{ required: true, message: 'Выберите стоимость доставки' }]}>
            <Radio.Group onChange={(e) => handleDeliveryChange(e.target.value)}>
              <Radio value="30"> до 30км + 40р </Radio>
              <Radio value="60"> до 60км + 60р  </Radio>
              <Radio value="100"> до 100км + 80р </Radio>
            </Radio.Group>
          </Form.Item>
  </>
)}

        <Form.Item label="Коментарий" name="comment">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Способ оплаты" name="paymentMethod" rules={[{ required: true, message: 'Выберите способ оплаты' }]}>
          <Radio.Group>
            <Radio value="cash" onChange={() => setIsPaymentVisible(false)}> Наличными </Radio>
            <Radio value="non-cash" onChange={() => setIsPaymentVisible(true)}> Безналичный </Radio>
          </Radio.Group>
        </Form.Item>

        {isPaymentVisible && (
          <>
        <Form.Item label="Номер карты" rules={[{ required: true, message: 'Введите номер карты' }]}>
          <Input
            placeholder="Номер карты"
            value={cardNumber}
            onChange={(e) => formatCardNumber(e.target.value)}
          />
        </Form.Item>

      <Form.Item label="Срок действия" rules={[{ required: true, message: 'Введите срок действия карты' }]}>
        <Input
          placeholder="Срок действия"
          value={expiryDate}
          onChange={(e) => formatExpiryDate(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="CVV" rules={[{ required: true, message: 'Введите CVV карты' }]}>
        <Input
          placeholder="CVV"
          value={cvv}
          onChange={(e) => formatCvv(e.target.value)}
        />
      </Form.Item>
          </>
        )}

        <Form.Item label="Серия и номер паспорта" name="passportSeriesNumber" rules={[{ required: true, message: 'Введите серию и номер паспорта' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Где и кем выдан паспорт" name="passportIssuedBy" rules={[{ required: true, message: 'Введите где и кем выдан паспорт' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Дата выдачи" name="dateOfIssued" rules={[{ required: true, message: 'Введите дату выдачи паспорта' }]}>
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