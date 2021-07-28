import React from 'react';
import TrackerHeading from './TrackerComponent/TrackerHeading';
import TrackerComponent from './TrackerComponent/TrackerComponent';
import { useMediaQuery } from 'react-responsive';

const CareeerPlanTracker = ({ user }) => {

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1200px)"
  });

  const { careerPlan } = user;

  if(!careerPlan)
    return null;

  return (
  <>
    {/*
    <TrackerHeading
       changeViewType={() => {}}
       currentView="Desktop"
       desktop={isDesktop}
    />*/}
    <TrackerComponent careerId={careerPlan.id} />
  </>
  );
}

export default CareeerPlanTracker;
