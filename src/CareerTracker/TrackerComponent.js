import React from 'react';
import { gql, useQuery } from "@apollo/client";
import { useMediaQuery } from 'react-responsive';
import Carousel from './Carousel/Carousel';
import './CareerTracker.css';

const GET_CAREER_PLAN = gql`
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

const TrackerComponent = (props) => {

  const {
    careerId,
    coursesStatus,
    completionStatuses,
    prerrequisites,
    changeStatusFn
  } = props;

  const isDesktop = useMediaQuery({query: '(min-device-width: 1200px)'});
  const { data, loading, error } = useQuery(GET_CAREER_PLAN, {
    variables: { id: careerId }
  });

  if(loading)
    return <p>Loading...</p>;

  if(error)
    return <p>Error</p>;

  const { courses, name } = data.careerPlan;

  const yearsPerTab = isDesktop ? 3 : 1;

  return (
  <>
    <h2 className="carrer-name">{name}</h2>
    <Carousel
      coursesStatus={coursesStatus}
      completionStatuses={completionStatuses}
      courses={courses}
      prerrequisites={prerrequisites}
      yearsPerTab={yearsPerTab}
      updateFn={changeStatusFn}
    />
  </>
  );
}

export default TrackerComponent;