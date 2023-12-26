/*//Этот файл представляет собой компонент React, отвечающий за верхнюю часть интерфейса (шапку) веб-приложения,
//включая навигационные ссылки, кнопки и логотип,
//и отображение различных элементов в зависимости от статуса пользователя (admin = true или admin = false), 
//используя библиотеки React, Ant Design и Effector.*/
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Space, Button, Image } from 'antd';
import { useUnit } from 'effector-react';
import { $user, resetUser } from '../Store/Store';
import '../pages/ContractPage.css';
import logo from './logo.png';

const Header = () => {
  const navigate = useNavigate();

  const user = useUnit($user);
  const handleLogout = () => {
    resetUser();
    navigate('/login');
  };

  return (
    <Layout.Header
      className="print-mode"
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
          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Image src={logo} alt="Logo" preview={false} style={{ height: '50px' }} />
          </div> */}
          <Link to='/'><Button type='primary' className="header-button">Главная</Button></Link>
          {user?.isAdmin && <Link to='/admin'><Button type='primary' className="header-button">Админ</Button></Link>}
          {user?.isAdmin && <Link to='/woodCount'><Button type='primary' className="header-button">Склад</Button></Link>}
          <Link to='/SampleContractPage'><Button type='primary' className="header-button">Договор</Button></Link>
          <Link to='/deliveryAndPayment'><Button type='primary' className="header-button">Доставка</Button></Link>
          <Link to='/catalog'><Button type='primary' className="header-button">Каталог</Button></Link>
          {!user && <><Link to='/login'><Button type='primary' className="header-button">Войти</Button></Link><Link to='/register'><Button type='primary'>Регистрация</Button></Link></>}
          {user && <Link to='/profile'><Button type='primary' className="header-button">Профиль</Button></Link>}
          {user && <Button type='primary' onClick={handleLogout} className="header-button">Выход</Button>}
          <Link to='/contacts'><Button type='primary' className="header-button">Контакты</Button></Link>
        </Space>
    </Layout.Header>
  );
};

export default Header;
