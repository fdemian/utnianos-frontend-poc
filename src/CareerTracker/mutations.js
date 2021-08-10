import { gql } from "@apollo/client";

export const ADD_CAREER_PLAN = gql`
  mutation AddCareerPlan($planId: Int!, $userId: Int!) {
    addCareerPlan(planId: $planId, userId: $userId) {
      ok
    }
  }
`;

export const CHANGE_COURSE_STATUS = gql`
  mutation ChangeCourseStatus($courseId: Int!, $statusId: Int!, $userId: Int!) {
   changeCourseStatus(courseId: $courseId, statusId: $statusId, userId: $userId) {
    ok
    courseId
    statusId
   }
  }
`;