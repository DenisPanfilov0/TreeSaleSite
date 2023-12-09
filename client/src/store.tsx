import { createStore, createEvent } from 'effector';

const accessTokenStore = createStore(null);
const refreshTokenStore = createStore(null);

const setAccessToken = createEvent();
const setRefreshToken = createEvent();

accessTokenStore.on(setAccessToken, (_, token) => token);
refreshTokenStore.on(setRefreshToken, (_, token) => token);

export {
  accessTokenStore,
  refreshTokenStore,
  setAccessToken,
  setRefreshToken,
};