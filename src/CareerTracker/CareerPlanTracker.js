import React from 'react';
import { useQuery } from "@apollo/client";
import { useMediaQuery } from 'react-responsive';
import { GET_CAREER_PLAN } from './queries';
import './CareerTracker.css';
import Carousel from './Carousel/Carousel';

const CareeerPlanTracker = ({ user, careerPlan }) => {

  const userId = user.id;
  const isDesktop = useMediaQuery({query: '(min-device-width: 1200px)'});
  const { data, loading, error } = useQuery(GET_CAREER_PLAN, {
      variables: {
        id: careerPlan
      }
   });

  if(!careerPlan)
    return null;

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
    <Carousel
      courses={courses}
      userId={userId}
      yearsPerTab={yearsPerTab}
    />
  </>
  );
}

export default CareeerPlanTracker;
