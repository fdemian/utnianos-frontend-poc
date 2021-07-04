const LOCALSTORAGE_USER_KEY = "loggedInUser";
const TOKEN_KEY = 'token';
const REFRESH_TOKEN = 'refreshToken';

export const setLoginData = (id, token, refresh) => {
  // Set user id, token and refresh token.
  sessionStorage.setItem(LOCALSTORAGE_USER_KEY, id.toString());
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(REFRESH_TOKEN, refresh);
}

export const getLoggedInUser = () => {
  return sessionStorage.getItem(LOCALSTORAGE_USER_KEY);
}

export const getAuthToken = () => sessionStorage.getItem(LOCALSTORAGE_USER_KEY);
export const isLoggedIn = () => sessionStorage.getItem(LOCALSTORAGE_USER_KEY) !== null;
export const logout = () => {
   sessionStorage.removeItem(LOCALSTORAGE_USER_KEY);
   sessionStorage.removeItem(TOKEN_KEY);
   sessionStorage.removeItem(REFRESH_TOKEN);
}
