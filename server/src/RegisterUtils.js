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
