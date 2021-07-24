import React from 'react';

const CareeerPlanTracker = ({ user }) => {

  console.clear();
  console.log(user);
  console.log(":::::");

  if(!user.careerPlan)
    return null;

  return (
    <div>TRACKER!</div>
  );
}

export default CareeerPlanTracker;
