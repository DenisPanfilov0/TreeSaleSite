/*Этот файл описывает модель заказа, описывая её характеристики (имя, отчество, фамилия, адрес заказа и тд)
задаем некоторым переменным значения "по дефолту" и экспортируем модель Order*/
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  middleName: {
    type: String,
    required: false,
  },
  deliveryAddress: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  deliveryDate: {
    type: String,
    required: false,
  },
  productName: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
  additionalService: {
    type: String,
    required: false,
  },
  deliveryOption: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: false,
  },
  finalPrice: {
    type: Number,
    required: false,
  },
  deliveryCost: {
    type: String,
    required: false,
  },
  orderStatus: {
    type: String,
    required: false,
    default: 'Заказ на редактировании',
  },
  product_id: {
    type: Number,
    required: false,
  },
  passportSeriesNumber: {
    type: String,
    required: false,
  },
  passportIssuedBy: {
    type: String,
    required: false,
  },
  dateOfIssued: {
    type: String,
    required: false,
  },
  numberCard: {
    type: String,
    required: false,
  },
  dateCard: {
    type: String,
    required: false,
  },
  cvvCard: {
    type: String,
    required: false,
  },
  dateCreateOrder: {
    type: String,
    required: false,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;