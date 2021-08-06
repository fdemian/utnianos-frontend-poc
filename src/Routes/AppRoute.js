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
  const [_1, _2, removeAuthToken] = useAuthToken();

  const logoutFn = async () => {
    await client.resetStore();
    removeAuthToken();
    history.push(`/`);
  }

  if(isPrivate && !isLoggedIn){
    logoutFn();
    return <Redirect to="/" />;
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
