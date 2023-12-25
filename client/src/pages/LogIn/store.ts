/*//Этот файл отвечает за создание эффектов и событий с использованием библиотеки Effector 
//для выполнения запроса на сервер при входе в систему, управления состоянием загрузки 
//и обновления данных пользователя в хранилище при успешной аутентификации.*/
import { createEvent, createEffect, sample } from 'effector';
import axios from 'axios';
import { setUser, resetUser } from '../../Store/Store';

import { baseUrl } from '../../constants';

interface CreateUserFx {
  login: string
  password: string
}

const logInFx = createEffect(async ({ login, password }: CreateUserFx) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { login, password });
    const userData = response.data.userDate;
    setUser(userData); // Вызываем событие setUser для обновления данных в $user
    return true;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
});

export const logIn = createEvent<CreateUserFx>()


sample({
  clock: logIn,
  target: logInFx,
})

export const $isLoading = logInFx.pending
