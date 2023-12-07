const User = require('./UserModel.ts');

async function saveUser(id, username, email, password) {
  const newUser = new User({
    id,
    username,
    email,
    password,
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