/*//Этот файл отвечает за отображение карточки товара в каталоге, включая изображение, название, цену, 
//описание и доступность товара, а также предоставляющий кнопку для оформления заказа, 
//взаимодействуя с сервером через HTTP-запросы и используя библиотеки React, Ant Design, Effector и Axios.*/
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { useUnit } from 'effector-react';
import { $user } from '../../Store/Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Text } = Typography;

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

const CatalogCard: React.FC<CatalogCardProps> = ({ product }) => {
  const user = useUnit($user);
  const navigate = useNavigate();
  const [woodCount, setWoodCount] = useState<number | null>(null);
  const [availabilityText, setAvailabilityText] = useState<any>(null);
  const [availabilityColor, setAvailabilityColor] = useState<any>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/woods?productName=${product.name}`);
        const wood = response.data.wood;

        if (wood && wood.quantity !== undefined) {
          setWoodCount(wood.quantity);

          // Устанавливаем текст и цвет в зависимости от наличия товара
          if (wood.quantity > 0) {
            setAvailabilityText('В наличии');
            setAvailabilityColor('green');
            setIsButtonDisabled(false);
          } else {
            setAvailabilityText('Нет в наличии');
            setAvailabilityColor('red');
            setIsButtonDisabled(true);
          }
        } else {
          // Если товара нет в базе данных или его количество неопределено
          setAvailabilityText('Нет в наличии');
          setAvailabilityColor('red');
          setIsButtonDisabled(true);
        }
      } catch (error) {
        console.error('Error fetching wood count:', error);
      }
    };

    fetchData();
  }, [product.name]);

  const handleOrderButtonClick = () => {
    if (user) {
      navigate('/order', { state: { product, woodCount } });
    } else {
      navigate('/login');
    }
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

{woodCount !== null && (
        <div style={{ marginTop: '8px' }}>
          {availabilityText && (
            <Text style={{ color: availabilityColor }}>{availabilityText}</Text>
          )}
        </div>
      )}

        <Button
          type="primary"
          block
          style={{ marginTop: '16px' }}
          onClick={handleOrderButtonClick}
          disabled={isButtonDisabled} // Устанавливаем свойство disabled
        >
          Заказать
        </Button>
      </div>
    </Card>
  );
};

export default CatalogCard;
