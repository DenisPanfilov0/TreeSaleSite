const express = require('express');
const app = express();
const port = 3000; 
const mongoose = require('mongoose');
const User = require('./src/UserModel.tsx');
const { exec } = require('child_process');


mongoose.connect('mongodb+srv://Alexander:1q2w3e4r@cluster0.jwcpdzh.mongodb.net/all_users', {
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', async () => {
  console.log('Успешное подключение к MongoDB');

  const newUser = new User({
    id: '2',
    username: 'Petr',
    email: 'petr@gmail.com',
    password: '1q2w3e',
  });

  try {
    await newUser.save();
    console.log('Пользователь успешно добавлен в коллекцию');
  } catch (error) {
    console.error('Ошибка при сохранении пользователя:', error);
  }
});


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});