import { Link, useNavigate } from 'react-router-dom';
import { Layout, Space, Button } from 'antd';
import { useUnit } from 'effector-react';
import { $user, resetUser } from '../Store/Store';

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
          {user?.isAdmin && <Link to='/admin'><Button type='primary'>Админ</Button></Link>}
          <Link to='/'><Button type='primary'>Home</Button></Link>
          <Link to='/catalog'><Button type='primary'>Каталог</Button></Link>
          {!user && <><Link to='/login'><Button type='primary'>Войти</Button></Link><Link to='/register'><Button type='primary'>Регистрация</Button></Link></>}
          {user && <Link to='/profile'><Button type='primary'>Профиль</Button></Link>}
          {user && <Button type='primary' onClick={handleLogout}>Выход</Button>}
        </Space>
    </Layout.Header>
  );
};

export default Header;
