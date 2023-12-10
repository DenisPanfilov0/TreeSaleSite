import { Link } from 'react-router-dom';
import { Layout, Space, Button } from 'antd';
import { useUnit } from 'effector-react';
import { $user } from '../Store/Store';

const Header = () => {
  const user = useUnit($user);

  return (
    <Layout.Header
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
          <Link to='/'><Button type='primary'>Home</Button></Link>
          <Link to='/catalog'><Button type='primary'>Catalog</Button></Link>
          {!user && <><Link to='/login'><Button type='primary'>Log in</Button></Link><Link to='/register'><Button type='primary'>Register</Button></Link></>}
          {user && <Link to='/profile'><Button type='primary'>Profile</Button></Link>}
        </Space>
    </Layout.Header>
  );
};

export default Header;
