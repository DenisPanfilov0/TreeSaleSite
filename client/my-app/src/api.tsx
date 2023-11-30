import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/');
    console.log('Данные успешно получены:', response.data);
    return response.data;
  } catch (error) {
    console.error('Произошла ошибка при получении данных:', error);
    throw error;
  }
};