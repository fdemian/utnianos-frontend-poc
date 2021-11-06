import React, { Suspense } from "react";
import Loading from '../Loading/LoadingIndicator';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useApolloClient } from "@apollo/client";
import { getUserId } from '../Login/authUtils';

const AppRoute = ({exact, path, component, isPrivate, key}) => {

  const id = getUserId();
  const isLoggedIn = id !== null;
  const history = useNavigate();
  const client = useApolloClient();

  const logoutFn = async () => {
    await client.resetStore();
    window.localStorage.clear();
    history.push(`/login`);
  }

  if(isPrivate && !isLoggedIn){
    logoutFn();
    return <Navigate to="/login" />;
  }
  else return (
  <Suspense fallback={<Loading />}>
    <Route
      exact={exact}
      path={path}
      component={component}
      key={key}
    />
  </Suspense>
  );
}

export default AppRoute;
