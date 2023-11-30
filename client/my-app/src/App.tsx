import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchData } from './api';

function App() {

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        console.log('Данные из API:', data);
        // Здесь вы можете обновить состояние компонента или выполнить другие действия с данными
      } catch (error) {
        console.error('Произошла ошибка при получении данных:', error);
        // Обработка ошибок
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
