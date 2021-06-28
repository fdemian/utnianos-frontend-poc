const LOCALSTORAGE_USER_KEY = "loggedInUser";

export function getMethodFromProps(props) {
  const matchParams = props.match.params;
  let method;

  if(matchParams === undefined || matchParams.method === undefined)
    method = 'login';
  else
    method = matchParams.method;

  return method;
}

export const isLoggedIn = () => localStorage.getItem(LOCALSTORAGE_USER_KEY) !== null;
export const getLoginData = () => localStorage.getItem(LOCALSTORAGE_USER_KEY);
export const setLoginData = (id) => localStorage.setItem(LOCALSTORAGE_USER_KEY, id);
export const logout = () => localStorage.removeItem(LOCALSTORAGE_USER_KEY);
