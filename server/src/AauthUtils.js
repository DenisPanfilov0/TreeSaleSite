/*Этот файл содержит функцию authenticateUser, которая проверяет аутентификацию 
пользователя по электронной почте и паролю, используя модель пользователя (UserModel)
и библиотеку bcrypt для сравнения паролей. Функция возвращает объект с 
результатом аутентификации, включая информацию о пользователе или сообщение об ошибке.*/
const User = require('./UserModel.js');
const bcrypt = require('bcrypt');

const authenticateUser = async (login, password) => {
    const existingUser = await User.findOne({ email: login });

    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);

      if (isPasswordValid) {
        // const token = existingUser.generateAuthToken();
        return { success: true, user: existingUser };
      } else {
        return { success: false, error: 'Неверный пароль' };
      }
    } else {
      return { success: false, error: 'Пользователь не найден' };
    }
};

module.exports = { authenticateUser };