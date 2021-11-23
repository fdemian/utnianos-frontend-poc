import React, {
  lazy,
  Suspense
} from 'react';
import Spin from 'antd/lib/spin';
import Affix from 'antd/lib/affix';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../Login/authUtils';
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_USER } from './Queries';
import { GET_IS_LOGGED_IN, SET_LOGIN } from '../Login/queries';

const NavbarDesktop = lazy(() => import('./NavbarDesktop'));
const NavbarMobile = lazy(() => import('./NavbarMobile'));

const Navbar = (props) => {

  const { mobile } = props;
  const navigate = useNavigate();
  const client = useApolloClient();
  const id = getUserId();
  const loginQuery = useQuery(GET_IS_LOGGED_IN);
  const isLoggedIn = (loginQuery.data && (loginQuery.data.loggedIn === true));
  const queryOpts = { variables: { id: id }, skip: !id };
  const { loading, error, data } = useQuery(GET_USER, queryOpts);


  const logoutFn = async () => {
    await client.resetStore();
    window.localStorage.clear();
    client.writeQuery({
       query: SET_LOGIN,
       data: {
        loggedIn: false,
       },
       variables: {
         status: false
       }
    });

    navigate(`/`);
  }

  if(error){
    console.log("Error");
    //logoutFn();
  }

  const navProps = {
    blogName: props.blogName,
    notificationsEnabled: false,
    notifications: [],
    logoutFn: logoutFn,
    loading: loading,
    data: data,
    isLoggedIn: isLoggedIn
  };

  if(mobile)
    return (
    <Suspense fallback={<Spin />}>
        <NavbarMobile {...navProps} />
    </Suspense>
    ) ;

    return (
    <Suspense fallback={<Spin />}>
      <Affix>
        <NavbarDesktop {...navProps} />
      </Affix>
    </Suspense>
  );

}

export default Navbar;
