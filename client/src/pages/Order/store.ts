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

export const $isLoading = sendOrderFx.pending;
export const $orderResponse = sendOrderFx.doneData;
