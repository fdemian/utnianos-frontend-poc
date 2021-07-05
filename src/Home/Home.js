import React from 'react';
import UnloggedHome from './UnloggedHome';
import LandingPage from './LandingPage';
import { useApolloClient, gql } from "@apollo/client";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
}`

const Home = () => {

  const client = useApolloClient();
  const loginData = client.readQuery({query:IS_LOGGED_IN});
  const { isLoggedIn } = loginData;

  if(isLoggedIn){
    return <LandingPage />;
  }
  else{
    return <UnloggedHome />;
  }

}

export default Home;
