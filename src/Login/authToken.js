import { useCookies } from "react-cookie";

const AUTH_TOKEN = 'AUTH_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const USER_ID = 'USER_ID';

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = () => {

  //we use react-cookies to access our cookies
  const [authCookies, setAuthCookie, removeAuthCookie] = useCookies([AUTH_TOKEN]);
  const [refreshCookies, setRefreshCookie, removeRefreshCookie] = useCookies([REFRESH_TOKEN]);
  const [userIdCookies, setUserIdCookie, removeUserIdCookie] = useCookies([USER_ID]);

  // this function allows to save any string in our cookies, under the key "authToken"
  const setAuthToken = async (id, token, refresh) => {
    await setAuthCookie(AUTH_TOKEN, token);
    await setRefreshCookie(REFRESH_TOKEN, refresh);
    await setUserIdCookie(USER_ID, id);
  }

  //this function removes the key "authToken" from our cookies. Useful to logout
  const removeAuthToken = () => {
     removeAuthCookie(AUTH_TOKEN);
     removeRefreshCookie(REFRESH_TOKEN);
     removeUserIdCookie(USER_ID);
  }

  return [
    {
      'auth': authCookies[AUTH_TOKEN],
      'refresh': refreshCookies[REFRESH_TOKEN],
      'id': userIdCookies[USER_ID]
    },
    setAuthToken,
    removeAuthToken
  ];
};

export const useIsLoggedIn = () => {
  const [authTokens] = useAuthToken();
  return {
    isLoggedIn: authTokens['auth'] !== undefined
  };
}
