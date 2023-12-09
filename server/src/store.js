const { createStore, createEvent } = require('effector');

const accessTokenStore = createStore(null);
const refreshTokenStore = createStore(null);

const setAccessToken = createEvent();
const setRefreshToken = createEvent();

accessTokenStore.on(setAccessToken, (_, token) => token);
refreshTokenStore.on(setRefreshToken, (_, token) => token);

module.exports = {
  accessTokenStore,
  refreshTokenStore,
  setAccessToken,
  setRefreshToken,
};