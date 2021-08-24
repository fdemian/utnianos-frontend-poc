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
        code
        name
      }
    }
  }
`;

export const GET_CAREER_PLANS = gql`
  query CareerPlans {
    careerPlans {
      __typename
      code
      name
    }
  }
`;


// Career plan tracker.

export const GET_PLAN_STATUS = gql`
  query CoursesStatus($id: Int!) {
    coursesStatus(id: $id) {
      __typename
      courseCode
      completionCode
    }
  }
`;

export const GET_COMPLETION_STATUSES = gql`
  query CompletionStatuses {
    completionStatuses {
      __typename
      status
      name
    }
  }
`;

export const GET_PRERREQUISITES = gql`
  query GetPrerrequisites {
    coursePrerrequisites {
      __typename
      courseCode
      prerrequisiteCode
      completionCode
      type
    }
  }
`;

export const GET_CAREER_PLAN = gql`
  query GetCareerPlan($id: String!) {
    careerPlan(id: $id) {
      __typename
      code
      name
      courses {
        code
        name
        year
      }
    }
  }
`;
