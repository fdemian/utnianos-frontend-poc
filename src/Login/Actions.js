/*import Fetch from '../store/Fetch';
import useSWR from 'swr';

const DATABASE_TYPE = "database";

export const useUser = (id) => {
  const shouldFetch = id >= 0 && id!== null && id!== undefined;
  const { data, mutate, error } = useSWR(shouldFetch ? `/api/users/${id}` : null);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}

export const newLogin = (username, password) => {

  const endpoint = "/api/auth";
  const jsonData = JSON.stringify({
     code: null,
     type: DATABASE_TYPE,
     redirectURL: "",
     username: username,
     password: password
  });

  const data = Fetch.POST(endpoint, [], jsonData, null);

  return data;
}*/
