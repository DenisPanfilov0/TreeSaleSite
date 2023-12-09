import axios from 'axios';

export const checkTokens = async () => {
    console.log('начали парс');
  try {
    const response = await axios.post('http://localhost:3000/api/check-tokens');

    if (!response.data.success) {
      console.error('Токены не действительны. Перенаправление на страницу входа.');
      // Реализуйте перенаправление на страницу входа, например, используя navigate
      // navigate('/login');
    }
  } catch (error) {
    console.error('Произошла ошибка при проверке токенов:', error);
  }
};

export default checkTokens;

// export const handleButtonClick = (path: string) => {
//   checkTokens();
// };
