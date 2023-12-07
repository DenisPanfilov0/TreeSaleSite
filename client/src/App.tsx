import React, { useEffect } from 'react';
import logo from './logo.svg';
// import './App.css';
import { fetchData } from './api';
import AuthForm from './AuthForm';
import RegistrationForm from './RegistrationForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        console.log('Данные из API:', data);
      } catch (error) {
        console.error('Произошла ошибка при получении данных:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
