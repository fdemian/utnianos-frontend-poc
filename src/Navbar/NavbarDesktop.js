import React, {
  lazy,
  Suspense
} from 'react';
import { Menu, Spin } from 'antd';
import NavLogo from './NavLogo';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt as signIn } from '@fortawesome/free-solid-svg-icons';
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { clearUserData, getLoggedInUser} from '../Login/utils';
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

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
}`


const Navbar = (props) => {

  const {
    notifications,
    /*notificationsEnabled,*/
    markReadNotification,
    isFetching,
    dismissNotifications,
    blogName
  } = props;


  const client = useApolloClient();
  const loginData = client.readQuery({query:IS_LOGGED_IN});
  const loggedIn = loginData.isLoggedIn;
  const id = getLoggedInUser();
  const queryOpts = { variables: { id: id }, skip: !loggedIn };
  const { loading, error, data } = useQuery(GET_USER, queryOpts);

  const logoutFn = () => {

    console.clear();
    console.log('client', client);
    console.log('clien.writeQuery', client.writeQuery);

    // Set isLoggedIn field to false in the apollo client.
    client.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        __typename: 'login',
        isLoggedIn: false
      },
      variables: {
        status: false
      }
     });

     clearUserData();
  }

  if(error)
    return <p>There was an error with the application.</p>;

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
           <NavLogo mobile={false} blogName={blogName} />
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
