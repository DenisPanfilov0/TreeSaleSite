import React from 'react';
import { Row, Col } from 'antd';
import CatalogCard from './CatalogCard';

const ProductsPage: React.FC = () => {
  const products = [
    { id: 1, name: 'Сосна', costLogs: 5, costChoppedWood: 10, image: 'https://fikiwiki.com/uploads/posts/2022-02/1645027473_37-fikiwiki-com-p-kartinki-dlya-detei-sosna-38.jpg' },
    { id: 2, name: 'Береза', costLogs: 2, costChoppedWood: 10, image: 'https://beamingnotes.com/wp-content/uploads/2018/03/nature-3070475_1920.jpg' },
    { id: 3, name: 'Ель', costLogs: 5, costChoppedWood: 10, image: 'https://img.razrisyika.ru/kart/20/1200/76097-el-17.jpg' },
    { id: 4, name: 'Акация', costLogs: 5, costChoppedWood: 10, image: 'http://vsegda-pomnim.com/uploads/posts/2022-04/1649543862_22-vsegda-pomnim-com-p-akatsiya-derevo-foto-22.jpg' },
    { id: 5, name: 'Клен', costLogs: 5, costChoppedWood: 10, image: 'https://www.fatra.su/wp-content/uploads/2023/06/1-11-700x626-1.jpg' },
    { id: 6, name: 'Дуб', costLogs: 5,  image: 'https://zelensad.com/upload/iblock/b84/b8475fb2ba1e8ce70711090385298913.jpg' },
  ];

  return (
    <div style={{ marginTop: 16 }}>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <CatalogCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductsPage;
