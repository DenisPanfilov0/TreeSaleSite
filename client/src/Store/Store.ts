import { createStore, createEvent } from 'effector';
import { UserData } from './types';

export const setUser = createEvent<UserData>();
export const resetUser = createEvent();

export const $user = createStore<UserData | null>(null);

$user
  .on(setUser, (_, userData) => userData) 
  .reset(resetUser);
