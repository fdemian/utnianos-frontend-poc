import { gql } from "@apollo/client";

export const ADD_CAREER_PLAN = gql`
  mutation AddCareerPlan($planId: Int!, $userId: Int!) {
    addCareerPlan(planId: $planId, userId: $userId) {
      ok
    }
  }
`;
