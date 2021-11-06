import React from "react";
import { Navigate } from 'react-router-dom';
import Loading from '../Loading/LoadingIndicator';
import { useApolloClient } from "@apollo/client";
import { getUserId } from '../Login/authUtils';

const PrivateRoute = ({ isPrivate, children }) => {

  const id = getUserId();
  const isLoggedIn = id !== null;
  const client = useApolloClient();

  const logoutFn = async () => {
    await client.resetStore();
    window.localStorage.clear();
  }

  if(isPrivate && !isLoggedIn){
    logoutFn();
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
