const express = require('express');
const app = express();
const port = 3000; 
const mongoose = require('mongoose');
const Users = require('./src/UserModel.js/index.ts');
const bcrypt = require('bcrypt');
const { authenticateUser } = require('./src/AauthUtils.ts');

mongoose.connect('mongodb+srv://Alexander:1q2w3e4r@cluster0.jwcpdzh.mongodb.net/all_users', {
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', async () => {
  console.log('Успешное подключение к MongoDB');

  // const newUser = new User({
  //   id: '2',
  //   username: 'Lala',
  //   email: 'lala@gmail.com',
  //   password: 'Lala123',
  // });

  // try {
    
    
  //   await newUser.save();
  //   console.log('Пользователь успешно добавлен в коллекцию');
  // } catch (error) {
  //   console.error('Ошибка при сохранении пользователя:', error);
  // }

  const login = 'lala@gmail.com';
  const password = 'Lala123';

  // const existingUser = await Users.findOne({ email: login });
  // // console.log(existingUser);
  // if (existingUser) {
  //   const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  //   if (isPasswordValid) {
  //     const token = existingUser.generateAuthToken();
  //     console.log('Авторизация успешна. Токен:', token);
  //   } else {
  //     console.error('Ошибка при авторизации. Неверный пароль');
  //   }
  // } else {
  //   console.error('Ошибка при авторизации. Пользователь не найден');
  // }

//   const loginToFind = 'petr@gmail.com';
// const userWithEmail = await User.findOne({ email: loginToFind }, {password: 1});
// if (userWithEmail.password == password) {
//   console.log('всё получилось')
// }
// console.log(userWithEmail);


// const users = await User.find({ email: 'exampleUser' }, { name: 1, email: 1 });
// console.log(users);

// console.log(await User.find({name: 1}, { email: loginToFind }));

// if (userWithEmail) {
//   console.log('Найден пользователь с email', loginToFind, 'и _id', userWithEmail._id);
// } else {
//   console.log('Пользователь с email', loginToFind, 'не найден');
// }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const result = await authenticateUser(login, password);

    res.json(result);
  } catch (error) {
    console.error('Произошла ошибка при аутентификации:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
