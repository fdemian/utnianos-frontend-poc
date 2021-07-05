import React from 'react';
import UnloggedHome from './UnloggedHome';
import LandingPage from './LandingPage';
import { useIsLoggedIn } from '../Login/authToken';

const Home = () => {

  const { isLoggedIn } = useIsLoggedIn();

  if(isLoggedIn){
    return <LandingPage />;
  }
  else{
    return <UnloggedHome />;
  }

}

export default Home;
