import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ApplicationRoutes from './Routes/Routes';
import AppRoute from './Routes/AppRoute';
//import reportWebVitals from './reportWebVitals';

const { App, Routes } = ApplicationRoutes;

const UTNApp = () => {
  return(
  <Router>
      <App>
        <Switch>
        {Routes.map(route =>
          <AppRoute
            exact={route.exact}
            path={route.path}
            component={route.component}
            isPrivate={route.private}
            key={route.path ? route.path.toString() : "-"}
          />
         )}
         </Switch>
       </App>
   </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <UTNApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
