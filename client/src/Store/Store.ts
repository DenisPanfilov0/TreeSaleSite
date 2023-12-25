/*Этот файл отвечает за создание и управление состоянием пользователя в приложении 
с использованием библиотеки Effector. В файле определены события setUser для установки данных пользователя 
и resetUser для сброса данных пользователя. 
Также создано хранилище $user, которое реагирует на события setUser и resetUser, 
обновляя состояние в соответствии с переданными данными пользователя или сбрасывая состояние.*/
import { createStore, createEvent } from 'effector';
import { UserData } from './types';

export const setUser = createEvent<UserData>();
export const resetUser = createEvent();

export const $user = createStore<UserData | null>(null);

$user
  .on(setUser, (_, userData) => userData) 
  .reset(resetUser);
