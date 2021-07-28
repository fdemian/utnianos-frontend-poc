import React from 'react';
import { gql, useQuery } from "@apollo/client";
import { useAuthToken} from '../Login/authToken';
import { Spin } from 'antd';
import CareerPlanSelector from './CareerPlanSelector';
import CareerPlanTracker from './CareerPlanTracker';

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

  const [authToken, _, removeAuthToken] = useAuthToken();
  const id = authToken['id'];
  const queryOpts = { variables: { id: id } };
  const userQuery = useQuery(GET_USER, queryOpts);
  const careerPlansQuery = useQuery(GET_CAREER_PLANS);

  if(userQuery.loading || careerPlansQuery.loading)
    return <Spin />;

  const { user } = userQuery.data;
  const { careerPlans } = careerPlansQuery.data;

  return (
  <div>
    <h1 className="career-tracker-title">Seguidor de carrera</h1>
    <CareerPlanSelector user={user} careerPlans={careerPlans} />
    <CareerPlanTracker user={user} />
  </div>
  );
}

export default CareerTracker;
