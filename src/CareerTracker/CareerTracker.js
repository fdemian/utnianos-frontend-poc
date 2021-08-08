import React, { lazy, useState, Suspense } from 'react';
import { gql, useQuery } from "@apollo/client";
import { useAuthToken} from '../Login/authToken';
import { Spin } from 'antd';

const CareerPlanSelector = lazy(() => import('./CareerPlanSelector'));
const CareerPlanTracker = lazy(() => import('./CareerPlanTracker'));

// Queries.
const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      __typename
      id
      username
      avatar
      careerPlan {
        id
        name
      }
    }
  }
`;


const CareerTracker = () => {

  const [authToken, _, _2] = useAuthToken();
  const id = authToken['id'];
  const queryOpts = { variables: { id: id } };
  const { data, loading, error } = useQuery(GET_USER, queryOpts);
  const [plan, setPlan] =  useState(null);

  if(loading)
    return <Spin />;

  if(error){
    console.clear();
    console.log(error);
    return <h1>Error</h1>;
  }

  const { user } = data;


  if(user && user.careerPlan && !plan){
    setPlan(user.careerPlan.id);
  }

  if(plan){
    return (
    <>
      <h1 className="career-tracker-title">
        Seguidor de carrera
      </h1>
      <Suspense fallback={<Spin />}>
        <CareerPlanTracker
          user={user}
          careerPlan={plan}
        />
      </Suspense>
    </>
    );
  }

  return(
  <>
    <h1 className="career-tracker-title">Seguidor de carrera</h1>
    <Suspense fallback={<Spin />}>
      <CareerPlanSelector
        user={user}
        setCareer={setPlan}
        plan={plan}
      />
     </Suspense>
   </>
   );

}

export default CareerTracker;
