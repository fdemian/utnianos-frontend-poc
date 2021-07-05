import React, {
  lazy,
  Suspense
} from 'react';
import { Menu, Spin } from 'antd';
import NavLogo from './NavLogo';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt as signIn
} from '@fortawesome/free-solid-svg-icons';
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { useIsLoggedIn, useAuthToken} from '../Login/authToken';
import './Navbar.css';

const AccountMenu = lazy(() => import('./AccountMenu/AccountMenu'));
//const Notifications = lazy(() => import('./Notifications'));

const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      id,
      username
      avatar
    }
  }
`;

const Navbar = (props) => {

  const {
    /*
    notifications,
    notificationsEnabled,
    markReadNotification,
    dismissNotifications,
    */
    blogName
  } = props;

  const history = useHistory();
  const client = useApolloClient();
  const { isLoggedIn } = useIsLoggedIn();
  const [authToken, _, removeAuthToken] = useAuthToken();

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

  if(error || !isLoggedIn)
  {
    return(
    <Suspense fallback={<Spin />}>
      <Menu
        mode="horizontal"
        key="parent.menu.not.logged"
        role="menu"
        aria-label="Navbar"
        className="desktop-menu"
      >
        <span className="logo-item-desktop" key="logo-item-desktop" role="menuitem">
           <NavLogo mobile={false} blogName={blogName} />
        </span>

        <span className="login-items"  role="menuitem">
         {
           loading ? <Spin /> :
           (
            <Link to="/login">
              <span className="login-link-text">Login &nbsp;</span>
              <FontAwesomeIcon icon={signIn} size="2x" />
            </Link>
            )
         }
        </span>
      </Menu>
    </Suspense>
    );
  }

  if(isLoggedIn) {
  return(
  <Suspense fallback={<Spin />}>
    <Menu
      mode="horizontal"
      key="parent.menu.not.logged"
      role="menu"
      aria-label="Navbar"
      className="desktop-menu"
    >
    {
      loading || !data ? <Spin /> :
      (
      <>
      <span className="logo-item-desktop" key="logo-item-desktop" role="menuitem">
         <NavLogo mobile={false} blogName={blogName} />
      </span>
       <span className="account-nav-items"  role="menuitem">
       {/*<Notifications
          notifications={notifications}
          clearFn={dismissNotifications}
          markRead={markReadNotification}
          dismiss={dismissNotifications}
        />*/}
        <AccountMenu user={data.user} logoutFn={logoutFn} />
       </span>
       </>
       )
      }
    </Menu>

   </Suspense>
   );
  }

}

export default Navbar;
