import { gql } from "@apollo/client";

export const GET_COURSE_MATERIAL = gql`
  query GetCourseMaterial($id: Int!) {
    classMaterial(id: $id) {
      name
      description
      contribTypes
      course {
        id
        name
      }
      files {
        id
        path
        type
      }
    }
  }
`;
