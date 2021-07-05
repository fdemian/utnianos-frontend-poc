import React, { Suspense } from "react";
import Loading from '../Loading/LoadingIndicator';
import { Route, Redirect } from 'react-router-dom';
import { useIsLoggedIn } from '../Login/authToken';

const AppRoute = ({exact, path, component, isPrivate, key}) => {

  const { isLoggedIn } = useIsLoggedIn();

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
