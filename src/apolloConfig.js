import { ApolloClient, createHttpLink, makeVar, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuthToken } from './Login/utils';

const httpLink = createHttpLink({uri: '/graphql' });
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

/*
export const isLoggedIn = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      loggedIn: {
        cartItems: {
          read() {
            return cartItemsVar();
          }
        }
      }
    }
  }
});
*/

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
