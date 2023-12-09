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
