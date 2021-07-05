import React from "react";
import App from '../App/App';
const Login = React.lazy(() => import('../Login/Login'));
const Home = React.lazy(() => import('../Home/Home'));
//const Seguidor = React.lazy(() => import('../Seguidor/Seguidor'));
const FileList = React.lazy(() => import('../FileList/FileList'));
const FileUploader = React.lazy(() => import('../FileUploader/FileUploader'));

const ApplicationRoutes = {
   App: App,
   Routes: [
    { path: "/", exact: true, component: Home, private: false },
    { path: "/login", exact: true, component: Login, private: false },
    { path: "/apuntes", exact: true, component: FileUploader, private: true }
    /*,

    { path: "/seguidor", exact: true, component: Seguidor, private: true }*/
   ]
};

export default ApplicationRoutes;
