import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { useAuthToken } from "./Login/authToken";
import { onError } from "@apollo/client/link/error";


// TODO:
//https://stackoverflow.com/questions/61327448/how-to-refresh-jwt-token-using-apollo-and-graphql

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.clear();
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

/*
export const REFRESH_QUERY = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    refresh(token: $refreshToken) {
      id
      accessToken
      refreshToken
    }
  }
`;
//let apolloClient;
const getNewToken = () => {

  return apolloClient.query({ query: GET_TOKEN_QUERY }).then((response) => {
    // extract your accessToken from your response data and return it
    const { accessToken } = response.data;
    return accessToken;
  });
};
const logoutOnError = (graphQLErrors, networkError) => {

  const [authToken, _, removeAuthToken] = useAuthToken();
  const client = useApolloClient();
  console.clear();

  if(networkError) {
    if(networkError.statusCode > 400 && networkError.statusCode < 500) {
      // Request code indicates a problem with the user request.
      console.log("::::::");
      console.log("network error");
    }
  }

  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if(err.message){
        const isUnauthorized = err.message.includes("401");
        if(isUnauthorized){
          console.log("::::::");
          console.log("unauthorized error");

          console.log(authToken['refresh']);
          console.log("::::");
          console.log(authToken['refresh']);
          console.log("::::");

          // Expired token or wrong credentials.
          //Logout.

        }
      }
      /*
      switch (err.extensions.code) {
        case "UNAUTHENTICATED":
          return fromPromise(
            getNewToken().catch((error) => {
              // Handle token refresh errors e.g clear stored tokens, redirect to login
              return;
            })
          )
            .filter((value) => Boolean(value))
            .flatMap((accessToken) => {
              const oldHeaders = operation.getContext().headers;
              // modify the operation context with a new token
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });

              // retry the request, returning the new observable
              return forward(operation);
            });
      }
    }
}
}
const useError = async ({graphQLErrors, networkError, operation, response, forward}) => {
    logoutOnError(graphQLErrors, networkError);
    //return forward(operation);
}
const errorLink = onError(
  (props) => useError(props)
);
*/

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
  const authLink = authMiddleware(authToken);
  return new ApolloClient({
    link: ApolloLink.from([ authLink, errorLink, httpLink]),
    cache,
  });
};
