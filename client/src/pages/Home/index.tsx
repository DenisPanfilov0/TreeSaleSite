/*//Этот файл представляет собой компонент React, отвечающий за отображение домашней страницы веб-приложения, 
//содержащей две секции с изображениями и текстовым описанием, представляющими товары и услуги компании.*/
import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import firstImage from './FirstImage.jpg';
import secondImage from './SecondImage.jpg';

const HomePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={100} sm={100} md={100} lg={100}>
          <img
            src={firstImage} // Замените ссылкой на вашу первую картинку
            alt="First Image"
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
          />
          <Typography.Paragraph style={{ marginTop: '16px' }}>
            Дрова от производителя с доставкой по г. Минску и Минской области. Осуществим резку и колку дров по индивидуальному заказу.
          </Typography.Paragraph>
        </Col>
        <Col xs={100} sm={100} md={100} lg={100}>
          <img
            src={secondImage} // Замените ссылкой на вашу вторую картинку
            alt="Second Image"
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
          />
          <Typography.Paragraph style={{ marginTop: '16px' }}>
            Схема сотрудничества будет выглядеть:
            <br />
            Шаг 1. Перейти в каталог и заполнить форму по заказу дров.
            <br />
            Шаг 2. На указанный Вами номер придет смс с номером заказа и датой доставки.
            <br />
            Шаг 3. Доставка дров с бесплатной разгрузкой.
            <br />
            Шаг 4. Оплата:
            <br />
            ⦁	Наличными;
            <br />
            ⦁	Банковской картой;
            <br />
            ⦁	Возможен безналичный расчет.
          </Typography.Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
