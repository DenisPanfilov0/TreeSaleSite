// const Users = require('./src/UserModel.tsx');
const User = require('./UserModel.ts');
const bcrypt = require('bcrypt');

const authenticateUser = async (login, password) => {
  // try {
    const existingUser = await User.findOne({ email: login });


    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);

      if (isPasswordValid) {
        const token = existingUser.generateAuthToken();
        return { success: true, token };
      } else {
        return { success: false, error: 'Неверный пароль' };
      }
    } else {
      return { success: false, error: 'Пользователь не найден' };
    }
  // } catch (error) {
    // console.error('Ошибка при аутентификации пользователя:', error);
    // return { success: false, error: 'Произошла ошибка' };
  // }
};

module.exports = { authenticateUser };