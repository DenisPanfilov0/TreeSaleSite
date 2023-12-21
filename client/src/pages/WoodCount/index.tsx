import React from 'react';
import { Row, Col } from 'antd';
import WoodCount from './WoodCount';
import { products } from '../CatalogCard/types';

const ProductsPage: React.FC = () => {

  return (
    <div style={{ marginTop: 16 }}>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <WoodCount product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductsPage;
