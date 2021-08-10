import { gql } from "@apollo/client";

// Queries.
export const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      __typename
      id
      username
      avatar
      careerPlan {
        id
        name
      }
    }
  }
`;

export const GET_CAREER_PLANS = gql`
  query CareerPlans {
    careerPlans {
      __typename
      id
      name
    }
  }
`;
