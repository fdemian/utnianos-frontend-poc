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


// Career plan tracker.

export const GET_PLAN_STATUS = gql`
  query CoursesStatus($id: Int!) {
    coursesStatus(id: $id) {
      __typename
      courseId
      completionId
    }
  }
`;

export const GET_COMPLETION_STATUSES = gql`
  query CompletionStatuses {
    completionStatuses {
      __typename
      id
      name
    }
  }
`;

export const GET_PRERREQUISITES = gql`
  query GetPrerrequisites {
    coursePrerrequisites {
      __typename
      courseId
      prerrequisiteId
      completionId
      type
    }
  }
`;

export const GET_CAREER_PLAN = gql`
  query GetCareerPlan($id: Int!) {
    careerPlan(id: $id) {
      __typename
      id
      name
      courses {
        id
        name
        year
      }
    }
  }
`;
