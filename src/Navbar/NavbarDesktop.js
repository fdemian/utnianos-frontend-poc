import React, {
  lazy,
  Suspense
} from 'react';
import Menu from 'antd/es/menu';
import Spin from 'antd/es/spin';
import NavLogo from './NavLogo';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt as signIn,
  faUserPlus as signUp
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const AccountMenu = lazy(() => import('./AccountMenu/AccountMenu'));
//const Notifications = lazy(() => import('./Notifications'));

const Navbar = (props) => {

  const {
    loading,
    data,
    logoutFn,
    isLoggedIn,
    blogName
  } = props;

  if(!isLoggedIn)
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
           loading ? <Spin role="loading" aria-busy={true} data-testid="loading-spinner" /> :
           (
            <>
              <Link to="/login">
                <span className="login-link-text">Login &nbsp;</span>
                <FontAwesomeIcon icon={signIn} size="2x" />
              </Link>
              <Link to="/register">
                <span className="register-link-text">Register &nbsp;</span>
                <FontAwesomeIcon icon={signUp} size="2x" />
              </Link>
            </>
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
      loading || !data ? <Spin aria-busy={true} data-testid="loading-spinner" /> :
      (
      <>
      <span className="logo-item-desktop" key="logo-item-desktop" role="menuitem">
         <NavLogo mobile={false} blogName={blogName} />
      </span>
       <span className="account-nav-items"  role="menuitem">
        <AccountMenu user={data.user} logoutFn={logoutFn} data-testid="username-test" />
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
