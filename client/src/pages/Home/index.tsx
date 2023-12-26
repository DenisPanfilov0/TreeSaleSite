import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import firstImage from './FirstImage.jpg';
import secondImage from './55555666666.jpg';

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Инициализируем useNavigate

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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={secondImage} 
              alt="Second Image"
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
            />
            <Button type="primary" style={{ marginTop: '16px' }} onClick={() => navigate('/catalog')}>
              Перейти в каталог
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
