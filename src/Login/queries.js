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

export const GET_IS_LOGGED_IN = gql`
  query GetLogin {
    loggedIn @client
  }
`;

export const SET_LOGIN = gql`
  query SetLogin($status:Boolean!) {
    loggedIn(status: $status)
  }`;
