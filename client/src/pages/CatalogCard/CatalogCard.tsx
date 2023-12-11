import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { useUnit } from 'effector-react';
import { $user } from '../../Store/Store';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface Product {
  id: number;
  name: string;
  costLogs: number;
  costChoppedWood?: number;
  image: string;
}

interface CatalogCardProps {
  product: Product;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  // const [totalCost, setTotalCost] = useState<number>(product.cost);
  const user = useUnit($user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTotalCost(quantity * product.cost);
  // }, [quantity, product.cost]);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const handleOrderButtonClick = () => {
    if (user) {
      // Если есть данные в хранилище, перенаправляем на страницу "/order"
      navigate('/order', { state: { product } });
    } else {
      // Если нет данных в хранилище, перенаправляем на страницу регистрации
      navigate('/register');
    }
  };

  return (
    <Card
      hoverable
      style={{ width: 240, textAlign: 'center' }}
      cover={<img alt={product.name} src={product.image} />}
    >
      <Text strong>{product.name}</Text>
      <Row gutter={[8, 8]} style={{ marginTop: '16px' }}>
      {product.costLogs && (
          <Col span={12}>
            <Text strong>В чурках: {product.costLogs}$</Text>
          </Col>
        )}
        {product.costChoppedWood && (
          <Col span={12}>
            <Text strong>Колотые: {product.costChoppedWood}$</Text>
          </Col>
        )}
      </Row>
      <Button type="primary" block style={{ marginTop: '16px' }} onClick={handleOrderButtonClick}>
        Order
      </Button>
    </Card>
  );
};

export default CatalogCard;
