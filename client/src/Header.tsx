import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
        <button type="button" onClick={() => navigate('/login')}> Log in </button>
        <button type="button" onClick={() => navigate('/register')}> Register </button>
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

export default AppHeader;
