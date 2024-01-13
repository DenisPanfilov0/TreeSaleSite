/*//Этот файл представляет страницу React, отвечающую за отображение списка продуктов, 
//каждый из которых представлен компонентом WoodCount и последующем рендере этого компонента.*/
import React from 'react';
import { Row, Col } from 'antd';
import WoodCount from './WoodCount';
import { products } from '../CatalogCard/types';

const ProductsPage: React.FC = () => {

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {products.map((product) => (
          <Col key={product.id} xs={8} sm={8} md={8} lg={8}>
            <WoodCount product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductsPage;
