import React, { lazy, useState, Suspense } from 'react';
import { gql, useQuery } from "@apollo/client";
import { useAuthToken} from '../Login/authToken';
import { Spin } from 'antd';

const CareerPlanSelector = lazy(() => import('./CareerPlanSelector'));
const CareerPlanTracker = lazy(() => import('./CareerPlanTracker'));

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

const GET_CAREER_PLANS = gql`
  query CareerPlans {
    careerPlans {
      __typename
      id
      name
    }
  }
`;

const CareerTracker = () => {

  const [authToken, _, _2] = useAuthToken();
  const id = authToken['id'];
  const queryOpts = { variables: { id: id } };
  const userQuery = useQuery(GET_USER, queryOpts);
  const careerPlansQuery = useQuery(GET_CAREER_PLANS);
  const [plan, setPlan] =  useState(null);

  if(userQuery.loading || careerPlansQuery.loading)
    return <Spin />;

  const { user } = userQuery.data;
  const { careerPlans } = careerPlansQuery.data;

  if(user && user.careerPlan && !plan){
    setPlan(user.careerPlan.id);
  }

  if(plan){
    return (
    <Suspense fallback={<Spin />}>
      <h1 className="career-tracker-title">Seguidor de carrera</h1>
      <CareerPlanTracker
        user={user}
        careerPlan={plan}
      />
    </Suspense>
    );
  }

  return(
  <Suspense fallback={<Spin />}>
    <h1 className="career-tracker-title">Seguidor de carrera</h1>
    <CareerPlanSelector
      user={user}
      careerPlans={careerPlans}
      setCareer={setPlan}
      plan={plan}
    />
   </Suspense>
   );

}

export default CareerTracker;
