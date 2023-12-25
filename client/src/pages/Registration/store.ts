/*//Этот файл отвечает за создание эффектов, событий и хранилищ с использованием библиотеки Effector 
//для регистрации нового пользователя, включая в себя запросы к серверу 
//с использованием Axios.*/
import { createEvent, createEffect, sample } from 'effector';
import axios from 'axios';

import { baseUrl } from '../../constants';
import { IUser } from './types'

const createUserFx = createEffect(
  (data: IUser) => axios.post(`${baseUrl}/register`, data)
)

export const createUser = createEvent<IUser>()

sample({
  clock: createUser,
  target: createUserFx,
})

export const $isLoading = createUserFx.pending
