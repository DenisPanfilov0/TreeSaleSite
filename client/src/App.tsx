import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './layout/Header';

import LogIn from './pages/LogIn';
import Registration from './pages/Registration';
import CatalogCard from './pages/CatalogCard/index';
import Profile from './pages/Profile/Profile'
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
          </Routes>
        </Layout.Content>
      </Layout.Content>
    </Router>
  );
};

export default App;
