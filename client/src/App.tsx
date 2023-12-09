import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import axios from 'axios';
import logo from './logo.svg';
import AppHeader from './Header';
// import './App.css';
import { fetchData } from './api';
import AuthForm from './AuthForm';
import RegistrationForm from './RegistrationForm';
const { Header, Content, Footer } = Layout;


const App = () => {

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


export default App;
