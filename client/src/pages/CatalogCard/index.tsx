/*//Этот файл отвечает за отображение страницы с продуктами (каталогом) посредством рендера заготовленной карточки, 
//включая карточки товаров, а также предоставляющий функциональность помощи с выбором типа древесины для 
//определенных назначений с использованием модального окна и библиотек React, Ant Design.*/
import React, { useState } from 'react';
import { Row, Col, Button, Radio, Form, Space, Typography, Modal } from 'antd';
import CatalogCard from './CatalogCard';
import { products } from './types';

const ProductsPage: React.FC = () => {
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [selectedWoodPurpose, setSelectedWoodPurpose] = useState<string | null>(null);

  const handleHelpButtonClick = () => {
    setShowHelpForm(true);
    setSelectedWoodPurpose(null); // Сбрасываем выбор назначения при закрытии формы помощи
  };

  const handleHelpFormClose = () => {
    setShowHelpForm(false);
    setSelectedWoodPurpose(null);
  };

  const helpFormOptions = [
    { label: 'Для камина', value: 'fireplace', answer: 'Рекомендуем использовать древесину: Дуб' },
    { label: 'Для бани', value: 'bath', answer: 'Рекомендуем использовать древесину: Береза' },
    {
      label: 'Для топки печи',
      value: 'stove',
      answer: 'Рекомендуем использовать древесину: Лиственный микс или Хвойные дрова',
    },
    { label: 'Для мангала', value: 'grill', answer: 'Рекомендуем использовать древесину: Лиственный микс' },
  ];

  const selectedOption = helpFormOptions.find((option) => option.value === selectedWoodPurpose);

  return (
    <div style={{ marginTop: 16 }}>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={8} sm={8} md={8} lg={8}>
            <CatalogCard product={product} />
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button type="primary" size="large" onClick={handleHelpButtonClick}>
          Помощь с выбором
        </Button>
        <Modal
          title="Помощь с выбором древесины"
          visible={showHelpForm}
          onCancel={handleHelpFormClose}
          footer={null}
        >
          <Form>
            <Form.Item label="Выберите назначение древесины" name="woodPurpose">
              <Radio.Group onChange={(e) => setSelectedWoodPurpose(e.target.value)}>
                {helpFormOptions.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            {selectedOption && (
              <Form.Item label="" name="recommendation">
                <Typography.Text>{selectedOption.answer}</Typography.Text>
              </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProductsPage;
