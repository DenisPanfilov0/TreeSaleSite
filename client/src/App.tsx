import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './layout/Header';

import LogIn from './pages/LogIn';
import Registration from './pages/Registration';
import CatalogCard from './pages/CatalogCard/index';
import Profile from './pages/Profile/Profile'
import Order from './pages/Order/Order';
import EditOrder from './pages/Order/EditOrder';
import Admin from './pages/Admin/Admin';
import { $user } from './Store/Store';
import { useUnit } from 'effector-react';

const App = () => {

  const user = useUnit($user); // Получаем данные пользователя из Store

  
  return (
    <Router>
      <Layout.Content>
        <Header />

        <Layout.Content className="site-layout" style={{ padding: '0 50px' }}>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/catalog" element={<CatalogCard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/editOrder" element={<EditOrder />} />
            {user?.isAdmin && <Route path="/admin" element={<Admin />} />}
          </Routes>
        </Layout.Content>
      </Layout.Content>
    </Router>
  );
};

export default App;
