/*Этот файл создает корневой элемент приложения с использованием React's Concurrent Mode 
и рендерит компонент App внутри строгого режима (StrictMode) в указанный HTML-элемент с идентификатором 'root'.*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
