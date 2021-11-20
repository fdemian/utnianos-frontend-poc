const USER_ID = 'ID';
const AUTH_TOKEN = 'AUTH_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const getUserId = () => {
  const stringId = localStorage.getItem(USER_ID);    
  return  stringId === null ? null : parseInt(stringId, 10);
}

export const setStorageTokens = (id, accessToken, refreshToken) => {
  localStorage.setItem(AUTH_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(USER_ID, id);
}
