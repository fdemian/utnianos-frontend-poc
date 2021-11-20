import React from 'react';
import UnloggedHome from './UnloggedHome';
import LandingPage from './LandingPage';
import Loading from '../Loading/LoadingIndicator';
import { getUserId } from '../Login/authUtils';
import { useQuery } from "@apollo/client";
import { GET_IS_LOGGED_IN } from '../Login/queries';

const Home = () => {

  const { data, loading } = useQuery(GET_IS_LOGGED_IN);
  const id = getUserId();

  if(loading)
    return <Loading />;

  /*
  console.clear();
  console.log(data);
  console.log(":::::");*/

  const isLoggedIn = data.loggedIn;

  if(isLoggedIn){
    return <LandingPage id={id} />;
  }
  else{
    return <UnloggedHome />;
  }

}

export default Home;
