// src/components/Catalog/CatalogCard.tsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Input } from 'antd';
import { useUnit } from 'effector-react';
import { $user } from '../../Store/Store';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

interface Product {
  id: number;
  name: string;
  cost: number;
  image: string;
}

interface CatalogCardProps {
  product: Product;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [totalCost, setTotalCost] = useState<number>(product.cost);
  const user = useUnit($user);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalCost(quantity * product.cost);
  }, [quantity, product.cost]);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const handleOrderButtonClick = () => {
    if (user) {
      // Если есть данные в хранилище, перенаправляем на страницу "/order"
      navigate('/order');
    } else {
      // Если нет данных в хранилище, перенаправляем на страницу регистрации
      navigate('/register');
    }
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.name} src={product.image} />}
    >
      <Meta
        title={product.name}
        description={
          <Row gutter={[8, 8]} justify="space-between">
            <Col span={12}>Unit Cost: {product.cost}$</Col>
            <Col span={12} style={{ textAlign: 'right' }}>Total Cost: {totalCost}$</Col>
          </Row>
        }
      />
      <Row style={{ marginTop: '16px' }} gutter={[8, 8]}>
        <Col span={12}>
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
          />
        </Col>
        <Col span={12}>
          <Button type="primary" block onClick={handleOrderButtonClick}>
            Order
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CatalogCard;
