import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { useAuthToken } from "./Login/authToken";


// TODO:
//https://stackoverflow.com/questions/61327448/how-to-refresh-jwt-token-using-apollo-and-graphql

const getAuthToken = (authTokens) => authTokens['auth'];
const authMiddleware = (authToken) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = getAuthToken(authToken);
    if (token) {

      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    return forward(operation);
});
const cache = new InMemoryCache({});
const httpLink = createHttpLink({ uri: '/graphql' });

export const useNewClient = () => {
  const [authToken] = useAuthToken();
  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    cache,
  });
};
