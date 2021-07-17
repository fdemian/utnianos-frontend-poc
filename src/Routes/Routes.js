import React from "react";
import App from '../App/App';
const Login = React.lazy(() => import('../Login/Login'));
const Register = React.lazy(() => import('../Register/Register'));
const RegisterSuccess = React.lazy(() => import('../Register/RegisterSuccess'));
const Home = React.lazy(() => import('../Home/Home'));
const FileList = React.lazy(() => import('../FileList/FileList'));
const FileUploader = React.lazy(() => import('../FileUploader/UploaderSteps'));
const ClassNotesView = React.lazy(() => import('../FileView/FileView'));
//const Seguidor = React.lazy(() => import('../Seguidor/Seguidor'));

const ApplicationRoutes = {
   App: App,
   Routes: [
    { path: "/", exact: true, component: Home, private: false },
    { path: "/login", exact: true, component: Login, private: false },
    { path: "/register", exact: true, component: Register, private: false },
    { path: "/registersuccess/:id", exact: true, component: RegisterSuccess, private: false },
    { path: "/classnotes", exact: true, component: FileList, private: true },
    { path: "/classnotes/upload", exact: true, component: FileUploader, private: true },
    { path: "/classnotes/:id", exact: true, component: ClassNotesView, private: true }
    /*,
    { path: "/seguidor", exact: true, component: Seguidor, private: true }*/
   ]
};

export default ApplicationRoutes;
