import { gql } from "@apollo/client";

export const GET_CONTRIB_TYPES = gql`
  query GetContribTypes {
    contribTypes {
      id
      name
    }
  }
`;

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
    }
  }
`;

export const ADD_CONTRIB = gql`
  mutation AddContribution($title: String!, $description: String!, $types: String!, $course: String!, $path: String) {
    addContrib(title: $title,description: $description, types: $types, course: $course, path: $path) {
      id
      ok
    }
  }
`;
