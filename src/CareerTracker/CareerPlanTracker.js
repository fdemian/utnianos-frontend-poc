import React from 'react';
//import TrackerHeading from './TrackerComponent/TrackerHeading';
import { Spin } from 'antd';
import TrackerComponent from './TrackerComponent/TrackerComponent';
import { gql, useQuery } from "@apollo/client";

const GET_PLAN_STATUS = gql`
  query CoursesStatus($id: Int!) {
    coursesStatus(id: $id) {
      __typename
      courseId
      completionId
    }
  }
`;


const GET_COMPLETION_STATUSES = gql`
  query CompletionStatuses {
    completionStatuses {
      __typename
      id
      name
    }
  }
`;

const GET_PRERREQUISITES = gql`
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

/*
<TrackerHeading
   changeViewType={() => {}}
   currentView="Desktop"
   desktop={isDesktop}
/>
*/
const CareeerPlanTracker = ({ user }) => {

  const { careerPlan } = user;
  const userId = user.id;

  const {data, loading, error } = useQuery(GET_PLAN_STATUS, {
    variables: {
      id: userId,
    },
    skip: !careerPlan
  });

  const statusesQuery = useQuery(GET_COMPLETION_STATUSES);
  const prerreqQuery =  useQuery(GET_PRERREQUISITES);

  if(!careerPlan)
    return null;

  if(loading || statusesQuery.loading || prerreqQuery.loading)
    return <Spin tip="Loading..." />;

  if(error || statusesQuery.error || prerreqQuery.error)
    return <p>Error</p>;

  const { completionStatuses } = statusesQuery.data;
  const { coursesStatus } = data;
  const { coursePrerrequisites } = prerreqQuery.data;

  return (
  <TrackerComponent
    careerId={careerPlan.id}
    coursesStatus={coursesStatus}
    completionStatuses={completionStatuses}
    prerrequisites={coursePrerrequisites}
    userId={userId}
  />
  );
}

export default CareeerPlanTracker;
