import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import AppHeader from './Header';
import axios from 'axios';
import logo from './logo.svg';
// import './App.css';
import { fetchData } from './api';
import AuthForm from './AuthForm';
import RegistrationForm from './RegistrationForm';
const { Header, Content, Footer } = Layout;


const App = () => {


  // const checkTokens = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/api/check-tokens');

  //     if (!response.data.success) {
  //       console.error('Токены не действительны. Перенаправление на страницу входа.');
  //       window.location.href = '/login';
  //     }
  //   } catch (error) {
  //     console.error('Произошла ошибка при проверке токенов:', error);
  //   }
  // };

  // useEffect(() => {
  //   checkTokens();
  // }, [window.location.pathname]);


  return (
    <Router>
      <Layout>
        <AppHeader />
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<AuthForm />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

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

export default App;
