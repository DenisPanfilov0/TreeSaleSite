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