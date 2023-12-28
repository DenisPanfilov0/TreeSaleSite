import { createEvent, createEffect, sample } from 'effector';
import axios from 'axios';

import { baseUrl } from '../../constants';
import { IWood } from './types';

// Эффект для изменения количества дров на складе
export const changeWoodCountFx = createEffect(
  (data: IWood) => axios.post(`${baseUrl}/woodsAdd`, data)
);

// Событие для изменения количества дров
export const changeWoodCount = createEvent<IWood>();

// Событие для получения текущего количества дров
export const fetchWoodQuantity = createEvent<string>();

// Событие для обновления количества дров
export const updateWoodQuantity = createEvent<{ productName: string; newQuantity: number }>();

// Эффект для получения текущего количества дров
export const fetchWoodQuantityFx = createEffect(
  async (productName: string) => {
    const response = await axios.get(`${baseUrl}/woodQuantity?productName=${productName}`);
    return response.data.quantity;
  }
);

// Эффект для обновления количества дров
export const updateWoodQuantityFx = createEffect(
  async ({ productName, newQuantity }: { productName: string; newQuantity: number }) => {
    await axios.post(`${baseUrl}/updateWoodQuantity`, { productName, newQuantity });
  }
);

// Обработка запроса на изменение количества дров при срабатывании события
sample({
  clock: changeWoodCount,
  target: changeWoodCountFx,
});

// Обработка запроса на получение текущего количества дров при срабатывании события
sample({
  clock: fetchWoodQuantity,
  target: fetchWoodQuantityFx,
});

// Обработка запроса на обновление количества дров при срабатывании события
sample({
  clock: updateWoodQuantity,
  target: updateWoodQuantityFx,
});

// Переменная для отслеживания состояния загрузки
export const $isLoading = changeWoodCountFx.pending;
