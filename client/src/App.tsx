import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './layout/Header';

import LogIn from './pages/LogIn';
import Registration from './pages/Registration';

const App = () => {
  return (
    <Router>
      <Layout.Content>
        <Header />

        <Layout.Content className="site-layout" style={{ padding: '0 50px' }}>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Layout.Content>
      </Layout.Content>
    </Router>
  );
};

export default App;
