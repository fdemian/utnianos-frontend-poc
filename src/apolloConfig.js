import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const clientLogout = () => {
  localStorage.removeItem('AUTH_TOKEN');
  localStorage.removeItem('REFRESH_TOKEN');
  localStorage.removeItem('USER_ID');
}

// TODO:
//https://stackoverflow.com/questions/61327448/how-to-refresh-jwt-token-using-apollo-and-graphql
const errorLink = onError((props) => {
  const { graphQLErrors, networkError } = props;
  if (graphQLErrors){
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Path: ${path}`
      )
    );
    clientLogout();
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const getAuthToken = () => localStorage.getItem('AUTH_TOKEN');
const authMiddleware = () =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = getAuthToken();
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
  const authLink = authMiddleware();
  return new ApolloClient({
    link: ApolloLink.from([ authLink, errorLink, httpLink]),
    cache,
  });
};
