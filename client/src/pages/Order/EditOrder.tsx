/*//Этот файл представляет компонент React для редактирования заказа (EditOrder). 
//Он включает в себя форму с предзаполненными данными заказа, а также функциональность 
//для обработки изменений, валидации и отправки обновленных данных заказа, таких как имя, 
//фамилия, адрес доставки, количество товара, дополнительные услуги и другие атрибуты.*/
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
  updateOrder
} from './store';

import { IOrder } from './types';
import { products } from '../CatalogCard/types';
import moment from 'moment';

const { TextArea } = Input;

const EditOrder: React.FC = () => {
  const user = useStore($user)!;

  const navigate = useNavigate();


  const location = useLocation();
//   const { product } = location.state || {};
  const { order } = location.state || {};
  const product = products.find((p) => p.id == order.product_id);
  const isLoading = useUnit($isLoading);
  
  useEffect(() => {
    handleServiceChange(order.additionalService)
    handleDeliveryChange(order.deliveryCost);
  }, [order.deliveryCost]);
  
const onFinish = async (values: IOrder) => {
    updateOrder({
      orderId: order._id,
      updatedData: {
        ...values,
        finalPrice: finalPrice,
        numberCard: cardNumber,
        dateCard: expiryDate,
        cvvCard: cvv,
      }
    });
    navigate('/profile');
  }


  const handlePlaceOrder = () => {
    form
      .validateFields(['amount'])
      .then((values) => {

      })
      .catch((errorInfo) => {
        console.error('Validation failed:', errorInfo);
      });
  };

  const [selectedService, setSelectedService] = useState<string>('logs');
  const [totalCostWithService, setTotalCostWithService] = useState<number>(product?.costLogs || 0);

  const [form] = Form.useForm();
  const quality = Form.useWatch('amount', form)

  const [minDeliveryDate, setMinDeliveryDate] = useState<Date | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<string>();

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); 
    setMinDeliveryDate(today);
  }, []);

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
  useEffect(() => {
    if(order.paymentMethod === 'non-cash'){
      setIsPaymentVisible(true);
      setCardNumber(order.numberCard)
      setExpiryDate(order.dateCard)
      setCvv(order.cvvCard)
    }
    else{
      setIsPaymentVisible(false);
    }

    if(order.deliveryOption === 'delivery'){
      setDeliveryOption(order.deliveryOption)
      // handleDeliveryChange(order.deliveryCost)
    }
    else{
      updateOrder({
        orderId: order._id,
        updatedData: { ...order, deliveryDate: '', deliveryCost: 0 },
      });
      handleDeliveryChange('');
    }
}, [order.paymentMethod, order.numberCard, order.dateCard, order.cvvCard, order.deliveryOption]);


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

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        initialValues={{ 
            productName: order.productName,
            firstName: order.firstName,
            lastName: order.lastName,
            middleName: order.middleName,
            deliveryAddress: order.deliveryAddress,
            phoneNumber: order.phoneNumber,
            deliveryCost: order.deliveryCost,
            deliveryOption: order.deliveryOption,
            amount: order.amount,
            comment: order.comment,
            paymentMethod: order.paymentMethod,
            finalPrice: order.finalPrice,
            additionalService: order.additionalService,
            passportSeriesNumber: order.passportSeriesNumber,
            passportIssuedBy: order.passportIssuedBy,
            dateOfIssued: order.dateOfIssued,
            deliveryDate: order.deliveryDate ? moment(order.deliveryDate) : null,
            // deliveryDate: order.deliveryDate,
        }}
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

        <Form.Item label="Адрес доставки" name="deliveryAddress" rules={[{ required: true, message: 'Введите адрес доставки' }]}>
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
          ]}>
          <InputNumber
            formatter={(value) => (value ? `${value}` : '')}
            parser={(value: any) => Math.max(0, value ? Number(value.replace(/\D/g, '')) : 0)} 
            min={0} 
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
          <Radio.Group >
            <Radio value="pickup" onChange={(e) => {setDeliveryOption(e.target.value); handleDeliveryChange('');}}> Самовывоз </Radio>
            <Radio value="delivery" disabled={quality < 5} onChange={(e) => {setDeliveryOption(e.target.value); handleDeliveryChange(order.deliveryCost);}}>
              Доставка {quality < 5 && <span style={{ color: 'red' }}>Минимальный объем доставки от 5м³</span>}
            </Radio>
          </Radio.Group>
        </Form.Item>

        {deliveryOption === 'delivery' && (
          <>
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
            <Button type="primary" /*onClick={() => onFinish(values)}*/htmlType="submit" loading={isLoading}>Сохранить изменения</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditOrder;