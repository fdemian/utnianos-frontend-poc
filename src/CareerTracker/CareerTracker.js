import React, { lazy, useState, Suspense } from 'react';
import { useQuery } from "@apollo/client";
import { GET_USER } from './queries';
import { getUserId } from '../Login/authUtils';
import Spin from 'antd/es/spin';

const CareerPlanSelector = lazy(() => import('./CareerPlanSelector'));
const CareerPlanTracker = lazy(() => import('./CareerPlanTracker'));

const CareerTracker = () => {

  const id = getUserId();
  const queryOpts = { variables: { id: id } };
  const { data, loading, error } = useQuery(GET_USER, queryOpts);
  const [plan, setPlan] =  useState(null);

  if(loading)
    return <Spin tip="Loading" />;

  if(error){
    console.log(error);
    return <h1>Error</h1>;
  }

  const { user } = data;

  if(user && user.careerPlan && !plan){
    setPlan(user.careerPlan.code);
  }

  if(plan){
    return (
    <Suspense fallback={<Spin />}>
      <h1 className="career-tracker-title">
        Seguidor de carrera
      </h1>
      <CareerPlanTracker
        user={user}
        careerPlan={plan}
        loading={loading}
      />
    </Suspense>
    );
  }

  return(
  <Suspense fallback={<Spin />}>
    <h1 className="career-tracker-title">Seguidor de carrera</h1>
    <CareerPlanSelector
       user={user}
       setCareer={setPlan}
       plan={plan}
     />
   </Suspense>
   );

}

export default CareerTracker;
