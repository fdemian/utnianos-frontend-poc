import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes as RoutesContainer, Route } from 'react-router-dom';
import ApplicationRoutes from './Routes/Routes';
import PrivateRoute from './Routes/PrivateRoute';
import {useNewClient} from './apolloConfig';
import { ApolloProvider } from "@apollo/client";
const { App, Routes } = ApplicationRoutes;
//import reportWebVitals from './reportWebVitals';

const UTNApp = () => {

  const client = useNewClient();

  return(
  <ApolloProvider client={client}>
    <Router>
      <App>
        <RoutesContainer>
          {Routes.map((route) =>
            <Route
              exact={route.exact}
              path={route.path}
              element={
               <PrivateRoute isPrivate={route.private}>
                {route.component}
              </PrivateRoute>
              }
              key={route.key}
            />
          )}
        </RoutesContainer>
      </App>
     </Router>
  </ApolloProvider>
  );
};

//<React.StrictMode>
ReactDOM.render(
    <UTNApp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
