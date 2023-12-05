const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  email: String,
  password: String,
});

userSchema.pre('save', async function (next) {
    const user = this;
  
    try {
      const salt = await bcrypt.genSalt(10);
  
      if (user.password !== null && user.password !== undefined) {
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
      }
  
      next();
    } catch (error) {
      return next(error);
    }
  });

// Метод для генерации JWT
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'your-secret-key'); // Замените на свой секретный ключ

  return token;
};

const User = mongoose.model('User', userSchema);

// export default User;
module.exports = User;