import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAuthToken, isLoggedIn } from './Login/utils';
const httpLink = createHttpLink({ uri: '/graphql' });
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

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
const cache = new InMemoryCache();
cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: false,
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache
});

export default client;
