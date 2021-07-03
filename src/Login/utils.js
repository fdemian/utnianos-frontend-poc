const LOCALSTORAGE_USER_KEY = "loggedInUser";

export const isLoggedIn = () => sessionStorage.getItem(LOCALSTORAGE_USER_KEY) !== null;
export const getLoginData = () => sessionStorage.getItem(LOCALSTORAGE_USER_KEY);
export const setLoginData = (id) => sessionStorage.setItem(LOCALSTORAGE_USER_KEY, id);
export const logout = () => sessionStorage.removeItem(LOCALSTORAGE_USER_KEY);
