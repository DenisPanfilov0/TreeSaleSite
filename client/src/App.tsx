import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import logo from './logo.svg';
import AppHeader from './Header';
// import './App.css';
import { fetchData } from './api';
import AuthForm from './AuthForm';
import RegistrationForm from './RegistrationForm';
const { Header, Content, Footer } = Layout;


function App() {
  // const navigate = useNavigate();

  return (
      <Router>
        <Layout>
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
            {/* <button type="button" onClick={() => navigate('/login')}> Log in </button> */}
              {/* <Link to="/login">
                <button type="button">Log in</button>
              </Link> */}
              <Link to="/login"><button type="button">Log in</button></Link>
              <Link to="/register"><button type="button">Register</button></Link>
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px' }}>
          <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
          </Content>
        </Layout>
      </Router>
  );
}


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Layout>
//               <Header>
//               <AppHeader />
//               </Header>
//               <Content className="site-layout" style={{ padding: '0 50px' }} />
//             </Layout>
//           }
//         />
//         <Route path="/login" element={<AuthForm />} />
//         <Route path="/register" element={<RegistrationForm />} />
//       </Routes>
//     </Router>
//   );
// };

function Root() {
  // const navigate = useNavigate();
  return (
    <div>
      {/* <button onClick={() => navigate(-1)}>go back</button> */}
      {/* <button type="button" onClick={() => navigate('/login')}> Log in </button> */}
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
}

export default App;