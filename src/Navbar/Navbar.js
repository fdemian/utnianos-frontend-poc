import React, {
  lazy,
  Suspense
} from 'react';
import Spin from 'antd/lib/spin';
import Affix from 'antd/lib/affix';
import { useHistory } from 'react-router';
import { getUserId } from '../Login/authUtils';
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_USER } from './Queries';

const NavbarDesktop = lazy(() => import('./NavbarDesktop'));
const NavbarMobile = lazy(() => import('./NavbarMobile'));

const Navbar = (props) => {

  const { mobile } = props;
  const history = useHistory();
  const client = useApolloClient();
  const id = getUserId();
  const isLoggedIn = id !== null;
  const queryOpts = { variables: { id: id }, skip: !id };
  const { loading, error, data } = useQuery(GET_USER, queryOpts);

  const logoutFn = async () => {
    await client.resetStore();
    window.localStorage.clear();
    history.push(`/`);
    window.location.reload();
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
