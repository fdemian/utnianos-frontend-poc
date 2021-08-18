import React from 'react';
import UnloggedHome from './UnloggedHome';
import LandingPage from './LandingPage';
import { getUserId } from '../Login/authUtils';

const Home = () => {
  const id = getUserId();
  const isLoggedIn = id !== null;

  if(isLoggedIn){
    return <LandingPage id={id} />;
  }
  else{
    return <UnloggedHome />;
  }

}

export default Home;
