const express = require('express');
const app = express();
const port = 3000; 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Разрешает запросы с этого origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});