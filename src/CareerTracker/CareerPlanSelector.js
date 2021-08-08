import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Card, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap as careerIcon } from '@fortawesome/free-solid-svg-icons';
import './CareerTracker.css';

const cardStyle = {
  width: 500,
  marginLeft: '26%',
};

const { Meta } = Card;

// Mutations/queries.
const ADD_CAREER_PLAN = gql`
  mutation AddCareerPlan($planId: Int!, $userId: Int!) {
    addCareerPlan(planId: $planId, userId: $userId) {
      ok
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

const CareerPlanSelector = ({ user, setCareer }) => {

  const careerPlansQuery = useQuery(GET_CAREER_PLANS);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [addCareerPlan, { data }] = useMutation(ADD_CAREER_PLAN);

  const setCareerPlan = () => {
    const variables = {
      planId: selectedPlan,
      userId: user.id
     };
     addCareerPlan({ variables: variables });
  }

  if(data && data.addCareerPlan && data.addCareerPlan.ok){
    setCareer(selectedPlan);
  }

  if(careerPlansQuery.loading)
    return <Spin />;

  const { careerPlans } = careerPlansQuery.data;

  return (
  <div className="career-plan-container">

    <span className="career-plan-text">
      <p>Aún no elegiste un plan de carrera.</p>
      <p>Selecciona tu carrera de la siguiente lista para continuar.</p>
    </span>

    <span className="carrer-plans">
    {careerPlans.map(c => (
      <div>
        <Card
            className={selectedPlan === c.id ? "career-plan-selected": ""}
            hoverable
            style={cardStyle}
            role="button"
            onClick={() => setSelectedPlan(c.id)}
        >
           <Meta title={c.name} description="" />
        </Card>
        <br />
      </div>
    ))}
    </span>

    <Button
      disabled={selectedPlan === null}
      className="career-picker-button"
      size="large"
      icon={<FontAwesomeIcon icon={careerIcon} size="1x" />}
      onClick={setCareerPlan}
     >
      &nbsp; Elegir plan de carrera
    </Button>

  </div>
  );
}

export default CareerPlanSelector;
