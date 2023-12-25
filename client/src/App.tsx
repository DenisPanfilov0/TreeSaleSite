/*Этот файл отвечает за настройку маршрутизации веб-приложения с использованием React Router, 
определение компонентов страниц и их отображение в зависимости от текущего маршрута. 
Также файл содержит основной макет приложения, включая шапку (Header) и основное содержимое (Layout.Content), 
а также проверку статуса Admin для отображения соответствующих страниц, таких как "Admin" и "WoodCount".*/
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
import ContractPage from './pages/ContractPage';
import SampleContractPage from './pages/SampleContractPage';
import Contacts from './pages/Contacts/Contacts';
import WoodCount from './pages/WoodCount/index';
import DeliveryAndPayment from './pages/DeliveryAndPayment/index';
import Home from './pages/Home/index';
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
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/catalog" element={<CatalogCard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/editOrder" element={<EditOrder />} />
            <Route path="/ContractPage" element={<ContractPage />} />
            <Route path="/SampleContractPage" element={<SampleContractPage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/deliveryAndPayment" element={<DeliveryAndPayment />} />
            {user?.isAdmin && <Route path="/admin" element={<Admin />} />}
            {user?.isAdmin && <Route path="/woodCount" element={<WoodCount />} />}
          </Routes>
        </Layout.Content>
      </Layout.Content>
    </Router>
  );
};

export default App;
