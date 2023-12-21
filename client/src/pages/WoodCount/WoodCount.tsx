import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Input, Form} from 'antd';
import { useUnit } from 'effector-react';
import { $user } from '../../Store/Store';
import { useNavigate } from 'react-router-dom';
import { $isLoading, changeWoodCount } from './store'
import { IWood } from './types';
import axios from 'axios';

const { Text } = Typography;
const { Item } = Form;

interface Product {
  id: number;
  name: string;
  costLogs?: number;
  costChoppedWood?: number;
  description?: string;
  image: string;
}

interface CatalogCardProps {
  product: Product;
}

const WoodCount: React.FC<CatalogCardProps> = ({ product }) => {

  const isLoading = useUnit($isLoading);
  const onFinish = async (values: IWood) => {
    const data: IWood = { ...values, productName };
    changeWoodCount(data);
  };


  const user = useUnit($user);
  const navigate = useNavigate();
  const [woodCount, setWoodCount] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newWoodCount, setNewWoodCount] = useState<string>('');
  const [productName, setProductName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      
        const response = await axios.get(`http://localhost:3000/api/woods?productName=${product.name}`);
        const wood = response.data.wood;
      
      setWoodCount(wood.quantity);
    };

    fetchData();
  }, [product.name]);

  const handleInputChange = (productName: string) => {
    setProductName(productName);
  };

  const defaultDescription = 'Дрова длиной 33-40 сантиметров. Цена указана за насыпной куб. Доставка оплачивается отдельно.';
  const fullDescription = product.description ? `${defaultDescription} ${product.description}` : defaultDescription;

  return (
    <Card
      hoverable
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img alt={product.name} src={product.image} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
      </div>
      <div style={{ marginLeft: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Text strong style={{ fontSize: '1.5rem' }}>{product.name}</Text>
        {product.costLogs && (
          <div style={{ marginTop: '8px' }}>
            <Text strong>В чурках: {product.costLogs}руб/м³</Text>
          </div>
        )}
        {product.costChoppedWood && (
          <div style={{ marginTop: '8px' }}>
            <Text strong>Колотые: {product.costChoppedWood}руб/м³</Text>
          </div>
        )}
        {fullDescription && (
          <div style={{ marginTop: '8px' }}>
            <Text>{fullDescription}</Text>
          </div>
        )}
        <div style={{ marginTop: '8px' }}>
          <Text strong>Доступное количество дров: {woodCount}</Text>
        </div>
        
          <Form onFinish={onFinish}>
            <Item name="quantity" rules={[{ required: true, message: 'Введите количество' }]}>
              <Input
                type="number"
                placeholder="Введите количество"
                value={newWoodCount}
                onChange={() => handleInputChange(product.name)}
                // onChange={(e) => setNewWoodCount(e.target.value)}
              />
            </Item>
            <Button type="primary" block htmlType="submit" loading={isLoading} style={{ marginTop: '16px' }}>
              Изменить количество
            </Button>
          </Form>
      </div>
    </Card>
  );
};

export default WoodCount;
