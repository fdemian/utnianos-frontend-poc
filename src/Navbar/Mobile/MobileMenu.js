import React, {
  lazy,
  Suspense
} from 'react';

const LoginMenu = lazy(() => import('./LoginMenu'));
const AccountMenu = lazy(() => import('./AccountMenu'));

const NavbarMenu = (props) => {

  const {
    logoutFn,
    loggedIn,
    notifications,
    notificationsEnabled,
    user,
    clearFn,
    closeDrawer
  } = props;

  if(loggedIn)
    return(
    <Suspense fallback={<p>Loading</p>}>
      <AccountMenu
        user={user}
        logoutFn={logoutFn}
        notifications={notifications}
        notificationsEnabled={notificationsEnabled}
        clearFn={clearFn}
        closeDrawer={closeDrawer}
      />
    </Suspense>
    );

   return (
  <Suspense fallback={<p>Loading</p>}>
     <LoginMenu closeDrawer={closeDrawer} />
  </Suspense>
   );
}

export default NavbarMenu;
