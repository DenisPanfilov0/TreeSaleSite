/*//Этот файл отвечает за создание эффектов, событий и хранилищ с использованием библиотеки Effector 
//для изменения количества дров на складе, включая в себя запросы к серверу 
//с использованием Axios.*/
import { createEvent, createEffect, sample } from 'effector';
import axios from 'axios';

import { baseUrl } from '../../constants';
import { IWood } from './types';

const changeWoodCountFx = createEffect(
  (data: IWood) => axios.post(`${baseUrl}/woodsAdd`, data)
)

export const changeWoodCount = createEvent<IWood>()

sample({
  clock: changeWoodCount,
  target: changeWoodCountFx,
})

export const $isLoading = changeWoodCountFx.pending