import React, { Suspense } from "react";
import Loading from '../Loading/LoadingIndicator';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useApolloClient } from "@apollo/client";
import { getUserId } from '../Login/authUtils';

const AppRoute = ({exact, path, component, isPrivate, key}) => {

  const id = getUserId();
  const isLoggedIn = id !== null;
  const history = useHistory();
  const client = useApolloClient();

  const logoutFn = async () => {
    await client.resetStore();
    window.localStorage.clear();
    history.push(`/login`);
  }

  if(isPrivate && !isLoggedIn){
    logoutFn();
    return <Redirect to="/login" />;
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
