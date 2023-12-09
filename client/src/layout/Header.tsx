import { Link } from 'react-router-dom';
import { Layout, Space, Button } from 'antd';

const Header = () => {
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
          <Link to='/login'><Button type='primary'>Log in</Button></Link>
          <Link to='/register'><Button type='primary'>Register</Button></Link>
        </Space>
    </Layout.Header>
  );
};

export default Header;
