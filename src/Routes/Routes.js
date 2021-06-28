import React from "react";
import App from '../App/App';
const Login = React.lazy(() => import('../Login/Login'));
const Home = React.lazy(() => import('../Home/Home'));

const ApplicationRoutes = {
   App: App,
   Routes: [
    { path: "/", exact: true, component: Home, private: false },
    { path: "/login", exact: true, component: Login, private: false }
   ]
};

export default ApplicationRoutes;
