import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      username
      avatar
    }
  }
`;

export const USER_LOGIN = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    auth(username: $username, password: $password) {
      ok
      id
      accessToken
      refreshToken
    }
  }
`;
