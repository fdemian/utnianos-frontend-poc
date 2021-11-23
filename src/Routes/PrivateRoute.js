import React from "react";
import { Navigate } from 'react-router-dom';
import { useApolloClient, useQuery } from "@apollo/client";
import { SET_LOGIN, GET_IS_LOGGED_IN } from '../Login/queries';

const PrivateRoute = ({ isPrivate, children }) => {

  const loginQuery = useQuery(GET_IS_LOGGED_IN);
  const isLoggedIn = loginQuery.data && loginQuery.data.loggedIn;
  const client = useApolloClient();

  const logoutFn = async () => {
    await client.resetStore();
    window.localStorage.clear();  
    client.writeQuery({
       query: SET_LOGIN,
       data: {
        loggedIn: false,
       },
       variables: {
         status: false
       }
    });
  }

  if(isPrivate && !isLoggedIn){
    logoutFn();
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
