import React, {
  lazy,
  Suspense
} from 'react';
import { Menu, Spin } from 'antd';
import NavLogo from './NavLogo';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt as signIn } from '@fortawesome/free-solid-svg-icons';
import { gql, useQuery } from "@apollo/client";
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
    loggedIn,
    notifications,
    /*notificationsEnabled,*/
    markReadNotification,
    isFetching,
    dismissNotifications,
    blogName
  } = props;

  const queryOpts = { variables: { id: 1 }, skip: !loggedIn };
  const { loading, error, data } = useQuery(GET_USER, queryOpts);

  if(!loggedIn)
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
           <NavLogo mobile={false} blogName={props.blogName} />
        </span>

        <span className="login-items"  role="menuitem">
         {
           isFetching ? <Spin /> :
           (
            <Link to="/login">
              <FontAwesomeIcon icon={signIn} />
              Login
            </Link>
            )
         }
        </span>
      </Menu>
    </Suspense>
    );
  }

  if(loggedIn){

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
         <NavLogo mobile={false} blogName={props.blogName} />
      </span>
       <span className="account-nav-items"  role="menuitem">
       {/*<Notifications
          notifications={notifications}
          clearFn={dismissNotifications}
          markRead={markReadNotification}
          dismiss={dismissNotifications}
        />*/}
        <AccountMenu user={data.user} />
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
