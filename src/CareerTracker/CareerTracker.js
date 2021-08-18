import React, { lazy, useState, Suspense } from 'react';
import { useQuery } from "@apollo/client";
import { Spin } from 'antd';
import { GET_USER } from './queries';
import { getUserId } from '../Login/authUtils';
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
