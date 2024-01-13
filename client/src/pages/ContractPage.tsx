/*//Этот файл представляет страницу React, отвечающую за отображение договора со всеми заполненными полями
//конкретного договора, передающий такие поля как: дата создания договора, ФИО покупателя, наименование продукта, количество и тд..*/
import React, { useState, useEffect } from 'react';
import './ContractPage.css';
import './TextImage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { products } from './CatalogCard/types';
import { Form } from 'antd';


const ContractPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const location = useLocation();
  const { order } = location.state || {}; // Извлекаем данные заказа из состояния маршрута
  const product = products.find((p) => p.id == order.product_id);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

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

  const [selectedService, setSelectedService] = useState<string>('logs');
  const [totalCostWithService, setTotalCostWithService] = useState<number>(product?.costLogs || 0);

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    setTotalCostWithService((value === 'logs' ? product?.costLogs || 0 : product?.costChoppedWood || 0));
  };

  useEffect(() => {
    handleServiceChange(order.additionalService)
    handleDeliveryChange(order.deliveryCost);
  }, [order.deliveryCost]);

  useEffect(() => {
    const printHandler = () => {
      navigate(-1);
    };

    window.addEventListener('afterprint', printHandler);

    return () => {
      window.removeEventListener('afterprint', printHandler);
    };
  }, [navigate]);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.print();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="contract-page">
      <div className="contract-content">
        {/* <button onClick={() => window.print()}>Печать</button> */}
        {/* <button id="printButton" onClick={() => window.print()}>Печать</button> */}
      </div>
      <div className="image-scroll-container">
        <img src="/image/dogovor_po_drovam2_page-0001.jpg" alt="Image 1" />
        <div className="contract_date">{formattedDate}</div>
        <div className="name_date">{order.lastName} {order.firstName} {order.middleName}</div>
        <div className="product_name">{order.productName}</div>
        <div className="amount">{order.amount}</div>
        <div className="additional_service">{totalCostWithService}</div>
        <div className="cost">{order.amount * totalCostWithService}</div>
        <div className="delivery_cost">{deliveryCost}</div>
        <div className="total_cost">{order.amount * totalCostWithService + deliveryCost}</div>
        <div className="delivery_address">{order.deliveryAddress}</div>
        {/* <div className="delivery_address"><p>"Адрес Доставки"</p></div> */}
        <img src="/image/dogovor_po_drovam2_page-0002.jpg" alt="Image 2" />
        <div className="full_name_date">{order.lastName} {order.firstName} {order.middleName}</div>
        <div className="full_delivery_address">{order.deliveryAddress}</div>
        <div className="phone_number">{order.phoneNumber}</div>
        <div className="passport_series_number">{order.passportSeriesNumber}</div>
        <div className="passport_issued_by">{order.passportIssuedBy} {order.dateOfIssued}</div>
        {/* <ImageOverlay text="Текст поверх изображения 2" /> */}
      </div>
    </div>
  );
};

export default ContractPage;
