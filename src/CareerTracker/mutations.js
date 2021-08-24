import { gql } from "@apollo/client";

export const ADD_CAREER_PLAN = gql`
  mutation AddCareerPlan($planId: String!, $userId: Int!) {
    addCareerPlan(planId: $planId, userId: $userId) {
      ok
    }
  }
`;

export const CHANGE_COURSE_STATUS = gql`
  mutation ChangeCourseStatus($courseCode: String!, $statusCode: String!, $userId: Int!) {
   changeCourseStatus(courseCode: $courseCode, statusCode: $statusCode, userId: $userId) {
    ok
    courseCode
    statusCode
   }
  }
`;
