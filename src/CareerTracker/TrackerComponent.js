import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { useQuery } from "@apollo/client";
import { useMediaQuery } from 'react-responsive';
import { GET_CAREER_PLAN } from './queries';
import './CareerTracker.css';

const Carousel = lazy(() => import('./Carousel/Carousel'));

const TrackerComponent = (props) => {

  const {
    careerId,
    coursesStatus,
    completionStatuses,
    prerrequisites,
    changeStatusFn
  } = props;

  const isDesktop = useMediaQuery({query: '(min-device-width: 1200px)'});
  const { data, loading, error } = useQuery(GET_CAREER_PLAN, { variables: { id: careerId } });

  if(loading)
    return <p>Loading...</p>;

  if(error)
    return <p>Error</p>;

  const { courses, name } = data.careerPlan;
  const yearsPerTab = isDesktop ? 3 : 1;
  
  return (
  <>
    <h2 className="carrer-name" key="career-name">
      {name}
    </h2>
    <Suspense fallback={<Spin />}>
      <Carousel
        coursesStatus={coursesStatus}
        completionStatuses={completionStatuses}
        courses={courses}
        prerrequisites={prerrequisites}
        yearsPerTab={yearsPerTab}
        updateFn={changeStatusFn}
      />
     </Suspense>
  </>
  );
}

export default TrackerComponent;
