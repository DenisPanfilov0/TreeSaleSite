/*Этот файл содержит функцию saveUser, которая создает нового пользователя с заданными данными
(имя пользователя, электронная почта, пароль, телефон) и сохраняет его в базе данных MongoDB
с использованием Mongoose. Файл также экспортирует эту функцию для использования в других частях приложения.*/
const User = require('./UserModel.js');

async function saveUser({ username, email, password, phone }) {
  const newUser = new User({
    username,
    email,
    password,
    phone,
    isAdmin: false,
  });

  try {
    await newUser.save();
    console.log('Пользователь успешно добавлен в коллекцию');
  } catch (error) {
    console.error('Ошибка при сохранении пользователя:', error);
    throw error;
  }
}

module.exports = {
  saveUser,
};
