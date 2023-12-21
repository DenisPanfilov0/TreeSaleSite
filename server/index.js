const express = require('express');
const app = express();
const port = 3000; 
const mongoose = require('mongoose');
const Users = require('./src/UserModel.js');
const bcrypt = require('bcrypt');
const { authenticateUser } = require('./src/AauthUtils.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const register = require('./src/RegisterUtils.js')
const Order = require('./src/OrderModel.js');
const Wood = require('./src/WoodModel.js');

mongoose.connect('mongodb+srv://Alexander:1q2w3e4r@cluster0.jwcpdzh.mongodb.net/all_users', {
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Ошибка подключения к MongoDB:'));
db.once('open', async () => {
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
    const user = await authenticateUser(login, password);

    if (user) {

      const accessToken = jwt.sign({ _id: user._id }, 'your-secret-key', { expiresIn: '1m' });
      const refreshToken = jwt.sign({ _id: user._id }, 'refresh-secret-key', { expiresIn: '7d' });

      res.cookie(
        'accessToken',
        accessToken,
        {
          httpOnly: true,
          maxAge: 60 * 1000,
          sameSite: 'None',
          secure: true,
          path: '/',
        });
      res.cookie(
        'refreshToken',
        refreshToken,
        {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: 'None',
          secure: true,
          path: '/',
        });

      res.json({ success: true, userDate: { _id: user.user._id, username: user.user.username, email: user.user.email, isAdmin: user.user.isAdmin } });

    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Произошла ошибка при аутентификации:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/api/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ success: false, error: 'Refresh Token is required' });
  }

  jwt.verify(refreshToken, 'refresh-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid Refresh Token' });
    }

    const newAccessToken = jwt.sign({ _id: decoded._id }, 'your-secret-key', { expiresIn: '15m' });

    res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 60 * 1000 });

    res.json({ success: true, accessToken: newAccessToken });
  });
});

app.post('/api/check-tokens', (req, res) => {
  // const accessToken = req.cookies.accessToken;
  // const refreshToken = req.cookies.refreshToken;

  // console.log(accessToken);
  // console.log(refreshToken);
  console.log('проверяет токент на серве');

  // res.json({ success: false, error: 'Invalid tokens' });
});

app.post('/api/register', (req, res) => {
  const { username, email, password, phone } = req.body;
  register.saveUser({ username, email, password, phone })
  res.status(200).json({ message: 'Вы зарегистрированы' })
})

app.post('/api/order', async (req, res) => {  
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    console.log('Заказ успешно сохранен');
    res.status(200).json({ success: true, message: 'Order saved successfully' });
  } catch (error) {
    console.error('Ошибка при сохранении заказа:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
})


app.put('/api/updateOrder/:orderId', async (req, res) => {
  console.log("была попытка")
  const { orderId } = req.params;
  const updatedOrderData = req.body;

  // try {
  //   const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
    
  //   if (!updatedOrder) {
  //     return res.status(404).json({ success: false, error: 'Order not found' });
  //   }

  //   console.log('Заказ успешно обновлен');
  //   res.status(200).json({ success: true, message: 'Order updated successfully', updatedOrder });
  // } catch (error) {
  //   console.error('Ошибка при обновлении заказа:', error);
  //   res.status(500).json({ success: false, error: 'Internal Server Error' });
  // }
});


app.post('/api/order/:orderId', async (req, res) => {
  console.log('хммм')
  const { orderId } = req.params;
  const updatedOrderData = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
    
    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    console.log('Заказ успешно обновлен');
    res.status(200).json({ success: true, message: 'Order updated successfully', updatedOrder });
  } catch (error) {
    console.error('Ошибка при обновлении заказа:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/orders/:userId', async (req, res) => {

  const userId = req.params.userId;

  try {
    const orders = await Order.find({ user_id: userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/editOrders/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findOne({ _id: orderId });
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/all_orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/api/update_order_status/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const { orderStatus } = req.body;

  try {
    await Order.findByIdAndUpdate(orderId, { orderStatus });
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/woods', async (req, res) => {
  try {
    const { productName } = req.query;

    // Проверка наличия имени в запросе
    if (!productName) {
      return res.status(400).json({ success: false, error: 'Missing productName parameter' });
    }

    const wood = await Wood.findOne({ productName });

    if (wood) {
      res.json({ success: true, wood });
    } else {
      res.json({ success: true, wood: null }); // или можно вернуть пустой массив в зависимости от ваших требований
    }
  } catch (error) {
    console.error('Error fetching woods:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/api/woodsAdd', async (req, res) => {
  const { productName, quantity } = req.body;

  try {
    const existingWood = await Wood.findOne({ productName });
    if (existingWood) {
      await Wood.deleteOne({ productName: existingWood.productName });
      console.log('Removed existing wood:', existingWood);

      const newWood = new Wood({ productName, quantity });
      await newWood.save();
      res.json({ success: true, wood: newWood });
      console.log('Created new wood:', newWood);
    } else {
      console.log('2')
      const newWood = new Wood({ productName, quantity });
      await newWood.save();
      res.json({ success: true, wood: newWood });
    }
  } catch (error) {
    console.error('Error saving wood:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Привет, мир!');
});


app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
