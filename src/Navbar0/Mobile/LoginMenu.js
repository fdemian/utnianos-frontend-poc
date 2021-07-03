import React, { Suspense } from 'react';
import Menu from 'antd/lib/menu';
import Spin from 'antd/lib/spin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt as signIn,
  faUserPlus as userPlus
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const LoginMenu = ({ closeDrawer }) => {

  return (
  <Suspense fallback={<Spin />}>
    <div className="sidemenu-inline sidemenu-mobile">
       <Menu
          onClick={null}
          defaultSelectedKeys={[]}
          defaultOpenKeys={[]}
          mode="inline"
        >
          <Menu.Item key="1" onClick={closeDrawer}>
            <Link to="/login" data-testid="login-link">
              <FontAwesomeIcon icon={signIn} />
              &nbsp;
              Log in
            </Link>
          </Menu.Item>
          {/*
         <Menu.Item key="2" onClick={closeDrawer}>
           <Link to="/register">
             <FontAwesomeIcon icon={userPlus} />
             &nbsp;
             Register
           </Link>
         </Menu.Item>*/}
        </Menu>
      </div>
  </Suspense>
  );
};

export default LoginMenu;
