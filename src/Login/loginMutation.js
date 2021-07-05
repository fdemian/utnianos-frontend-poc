import { useMutation, gql } from "@apollo/client";
import { useAuthToken } from "./authToken";

export const USER_LOGIN = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    auth(username: $username, password: $password) {
      id
      accessToken
      refreshToken
    }
  }
`;

export const useLoginMutation = () => {
  const [_, setAuthToken] = useAuthToken();

  const [mutation, mutationResults] = useMutation(USER_LOGIN, {
    onCompleted: (data) => {
      //if the mutation succeed, we save the token for later
      const { id, accessToken, refreshToken } = data.auth;
      setAuthToken(id, accessToken, refreshToken);
    }
  });

  const login = (variables) => mutation(variables);

  return [login, mutationResults]
};
