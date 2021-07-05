import React, { Suspense } from "react";
import Loading from '../Loading/LoadingIndicator';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn, useIsLoggedIn } from '../Login/utils';
import { gql, useApolloClient } from "@apollo/client";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
}`

const AppRoute = ({exact, path, component, isPrivate, key}) => {
  const client = useApolloClient();
  const loginData = client.readQuery({query:IS_LOGGED_IN});
  const { isLoggedIn } = loginData;
  if(isPrivate && !isLoggedIn)
    return  <Redirect to='/login' />;
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
