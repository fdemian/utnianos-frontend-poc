import React from 'react';
import { gql, useQuery } from "@apollo/client";
import CarouselView from './CarouselView/CarouselView';
import '../CareerTracker.css';

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
    userId,
    changeCourseStatus
  } = props;


  const { data, loading, error } = useQuery(GET_CAREER_PLAN, {
    variables: { id: careerId }
  });


  if(loading)
    return <p>Loading...</p>;

  if(error)
    return <p>Error</p>;

  const { courses, name } = data.careerPlan;

  const updateStatusFn = (materiaId, status) => {
   changeCourseStatus({ variables: {
     courseId: materiaId,
     userId: userId,
     statusId: status
   }});
  }

  return (
  <>
    <h2 className="carrer-name">{name}</h2>
    <CarouselView
      materias={courses}
      coursesStatus={coursesStatus}
      completionStatuses={completionStatuses}
      updateEstado={updateStatusFn}
      prerrequisites={prerrequisites}
    />
  </>
  );
}

export default TrackerComponent;
