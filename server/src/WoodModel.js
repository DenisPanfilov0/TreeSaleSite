/*Этот файл описывает модель Древесины, описывая её характеристики 
(имя продукции и её количество на складе) и экспортируем модель Wood*/
const mongoose = require('mongoose');

const woodSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Wood = mongoose.model('Wood', woodSchema);

module.exports = Wood;
