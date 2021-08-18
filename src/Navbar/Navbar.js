import React, {
  lazy,
  Suspense
} from 'react';
import Spin from 'antd/lib/spin';
import Affix from 'antd/lib/affix';
import { useHistory } from 'react-router';
import { getUserId } from '../Login/authUtils';
import { gql, useQuery, useApolloClient } from "@apollo/client";

const NavbarDesktop = lazy(() => import('./NavbarDesktop'));
const NavbarMobile = lazy(() => import('./NavbarMobile'));

const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      __typename
      id
      username
      avatar
    }
  }
`;


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
  }

  if(error){
    window.localStorage.clear();
    history.push(`/login`);
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
