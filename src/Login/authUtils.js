const USER_ID = 'ID';
const AUTH_TOKEN = 'AUTH_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const getUserId = () => {
  return localStorage.getItem(USER_ID);
}

export const setStorageTokens = (id, accessToken, refreshToken) => {
  localStorage.setItem(AUTH_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(USER_ID, id);
}
