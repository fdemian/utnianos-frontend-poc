import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      __typename
      id
      username
      avatar
    }
  }
`;
