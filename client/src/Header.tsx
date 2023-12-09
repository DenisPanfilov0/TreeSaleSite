import React from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { Layout, Menu, Row, Col, Space } from 'antd';
import axios from 'axios';
import TokenUtils from './tokenUtils';


const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  // const logCookies = () => {
  //   const cookies = document.cookie;
  //   console.log('Cookies:', cookies);
  // };
  
  // // Функция для проверки токенов
  // const checkTokens = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/api/check-tokens');

  //     if (!response.data.success) {
  //       console.error('Токены не действительны. Перенаправление на страницу входа.');
  //       // Реализуйте перенаправление на страницу входа, например, используя navigate
  //       // navigate('/login');
  //     }
  //   } catch (error) {
  //     console.error('Произошла ошибка при проверке токенов:', error);
  //   }
  // };

  // const handleButtonClick = (path: string) => {
  //   // При каждом нажатии на кнопку вызывайте функцию проверки токенов
  //   checkTokens();

  //   // Здесь можно добавить дополнительную логику, если необходимо,
  //   // например, перенаправление на другую страницу
  //   navigate(path);
  // };
  

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
        <Space>
        <button type="button" onClick={() => {  navigate('/'); }}> Home </button>
        <button type="button" onClick={() => { navigate('/login'); }}> Log in </button>
        <button type="button" onClick={() => {  navigate('/register'); }}> Register </button>
        {/* <button type="button" onClick={logCookies}> Log Cookies </button> */}
        </Space>

        
      {/* <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu> */}
    </Header>
  );
};

// const handleButtonClick = (path: string) => {
//   // При каждом нажатии на кнопку вызывайте функцию проверки токенов
//   checkTokens();

//   // Здесь можно добавить дополнительную логику, если необходимо,
//   // например, перенаправление на другую страницу
//   navigate(path);

// const checkTokens = async () => {
//   try {
//     // Отправьте запрос на сервер для проверки токенов
//     const response = await axios.post('http://localhost:3000/api/check-tokens');

//     if (!response.data.success) {
//       console.error('Токены не действительны. Перенаправление на страницу входа.');
//       // Реализуйте перенаправление на страницу входа, например, используя useNavigate
//     }
//   } catch (error) {
//     console.error('Произошла ошибка при проверке токенов:', error);
//   }
// };

export default AppHeader;
