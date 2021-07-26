import React from 'react';
import { gql, useQuery } from "@apollo/client";
import CarouselView from '../CarouselView/CarouselView';

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


const TrackerComponent = ({ careerId }) => {

  const { data, loading, error } = useQuery(GET_CAREER_PLAN, {
    variables: { id: careerId }
  });

  if(loading)
    return <p>Loading...</p>;

  if(error)
    return <p>Error</p>;

  const { courses } = data.careerPlan;

  return (
  <>
    <CarouselView
      materias={courses}
      updateEstado={(e) => console.log(e)}
    />
  </>
  );
}

export default TrackerComponent;
