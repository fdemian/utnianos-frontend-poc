import React, {
  lazy,
  Suspense
} from 'react';
import Spin from 'antd/lib/spin';
import Affix from 'antd/lib/affix';
import { useHistory } from 'react-router';
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { useIsLoggedIn, useAuthToken} from '../Login/authToken';

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
  const { isLoggedIn } = useIsLoggedIn();
  const authTokenParam = useAuthToken();
  const authToken = authTokenParam[0];
  const removeAuthToken = authTokenParam[2];

  const id = authToken['id'];
  const queryOpts = { variables: { id: id }, skip: !isLoggedIn };
  const { loading, error, data } = useQuery(GET_USER, queryOpts);

  const logoutFn = async () => {
    await client.resetStore();
    removeAuthToken();
    history.push(`/`);
  }

  if(error){
    removeAuthToken();
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
