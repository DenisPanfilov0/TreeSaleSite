/*//Этот файл отвечает за создание эффектов, событий и хранилищ с использованием библиотеки Effector 
//для обработки отправки и обновления заказов, включая в себя запросы к серверу 
//с использованием Axios, а также управление состоянием, связанным с загрузкой заказов и ответами от сервера.*/
import { createEffect, createEvent, createStore, sample } from 'effector';
import axios from 'axios';
import { IOrder } from './types';
import { baseUrl } from '../../constants';

const sendOrderFx = createEffect(
  (data: IOrder) => axios.post(`${baseUrl}/order`, data),
);

export const createOrder = createEvent<IOrder>({
});


sample({
  clock: createOrder,
  target: sendOrderFx,
});


const updateOrderFx = createEffect(
  ({ orderId, updatedData }: { orderId: string, updatedData: IOrder }) =>
    axios.post(`${baseUrl}/order/${orderId}`, updatedData),
);

export const updateOrder = createEvent<{ orderId: string, updatedData: IOrder }>();

sample({
  clock: updateOrder,
  target: updateOrderFx,
});

export const $isLoading = sendOrderFx.pending;
export const $orderResponse = sendOrderFx.doneData;
