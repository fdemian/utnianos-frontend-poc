import React, { lazy, Suspense, useState } from 'react';
import { Spin } from 'antd';
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_PLAN_STATUS,
  GET_COMPLETION_STATUSES,
  GET_PRERREQUISITES
} from './queries';
import { CHANGE_COURSE_STATUS } from './mutations';

const TrackerComponent = lazy(() => import('./TrackerComponent'));

const CareeerPlanTracker = ({ user, careerPlan }) => {

  const userId = user.id;
  const [changeCourseStatus] = useMutation(CHANGE_COURSE_STATUS);
  const [courseStatusesInternal, setCoursesStatuses] = useState(null);

  const {data, loading, error } = useQuery(GET_PLAN_STATUS, {
    variables: { id: userId },
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

  if(!courseStatusesInternal && coursesStatus) {
    setCoursesStatuses(coursesStatus);
  }

  const changeStatusFn = (courseCode, statusCode) => {
    changeCourseStatus({ variables: {
      courseCode: courseCode,
      userId: userId,
      statusCode: statusCode
    }});

    let newStatuses = coursesStatus.map(cs => {
       if(cs.courseCode === courseCode){
         return {
           completionCode: statusCode,
           courseCode: cs.courseCode,
          __typename: "CoursesStatusObj"
         }
       }
       return cs;
    });

    setCoursesStatuses(newStatuses);
  }

  return (
  <Suspense fallback={<Spin />}>
    <TrackerComponent
      careerId={careerPlan}
      coursesStatus={courseStatusesInternal}
      completionStatuses={completionStatuses}
      prerrequisites={coursePrerrequisites}
      userId={userId}
      changeStatusFn={changeStatusFn}
    />
  </Suspense>
  );
}

export default CareeerPlanTracker;
