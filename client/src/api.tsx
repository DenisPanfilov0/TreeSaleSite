/*Это тестовый скрипт, поэтому он не актуален, но он посылает запрос на сервер, и проверяет, достучались мы до указанного пути или нет*/
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