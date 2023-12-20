const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  additionalService: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  deliveryCost: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'в обработке',
  },
  product_id: {
    type: Number,
    required: true,
  },
  passportSeriesNumber: {
    type: Number,
    required: true,
  },
  passportIssuedBy: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;