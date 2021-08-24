import { gql } from "@apollo/client";

export const GET_CONTRIB_FILES = gql`
  query GetContributions {
    classMaterials {
      id
      name
      contribTypes
      course {
        code
        name
      }
    }
  }
`;

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
      code
      name
    }
  }
`;
