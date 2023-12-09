import { createEvent, createEffect, sample } from 'effector';
import axios from 'axios';

import { baseUrl } from '../../constants';

interface CreateUserFx {
  login: string
  password: string
}

const logInFx = createEffect(
  ({ login, password }: CreateUserFx) => axios.post(`${baseUrl}/login`, { login,  password })
)

export const logIn = createEvent<CreateUserFx>()


sample({
  clock: logIn,
  target: logInFx,
})

export const $isLoading = logInFx.pending
