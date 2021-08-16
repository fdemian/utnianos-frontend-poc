import React, { Suspense } from "react";
import Loading from '../Loading/LoadingIndicator';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useIsLoggedIn, useAuthToken } from '../Login/authToken';
import { useApolloClient } from "@apollo/client";

const AppRoute = ({exact, path, component, isPrivate, key}) => {

  const { isLoggedIn } = useIsLoggedIn();
  const history = useHistory();
  const client = useApolloClient();
  const authTokenParam = useAuthToken();
  const removeAuthToken = authTokenParam[2];

  const logoutFn = async () => {
    await client.resetStore();
    removeAuthToken();
    history.push(`/login`);
  }

  if(isPrivate && !isLoggedIn){
    console.clear();
    console.log(isLoggedIn);
    console.log(":::::");
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
