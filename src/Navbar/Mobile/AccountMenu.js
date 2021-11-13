import React, { Suspense } from 'react';
import Menu from 'antd/lib/menu';
import Spin from 'antd/lib/spin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog as cog,
  faSignOutAlt as signOut,
  faUser as userIcon
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const SubMenu = Menu.SubMenu;

const AccountMenu = (props) => {

  const { logoutFn, closeDrawer } = props;

  const logoutAndClose = () => {
    logoutFn();
    closeDrawer();
  }

  return (
  <div className="sidemenu-inline sidemenu-mobile">
  <Suspense fallback={<Spin />}>
      <Menu
        onClick={null}
        defaultSelectedKeys={[]}
        defaultOpenKeys={[]}
        mode="inline"
      >
        <SubMenu
          key="UserMenu"
          title={
            <strong className="sidemenu-style-title">
              <FontAwesomeIcon icon={userIcon} size="lg" />
              &nbsp; Opciones
            </strong>
          }>
          <Menu.Item key="UserMenu:3" onClick={closeDrawer} className="MenuItem">
            <Link to="/settings">
              <FontAwesomeIcon
                icon={cog}
                className="MenuIcon"
                size="lg"
              />
              &nbsp; Ajustes
            </Link>
          </Menu.Item>
          <Menu.Item key="UserMenu:4" onClick={logoutAndClose} className="MenuItem">
              <FontAwesomeIcon
                icon={signOut}
                className="MenuIcon"
                size="lg"
              />
              &nbsp; Cerrar sesión
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Suspense>
  </div>
  )
};

export default AccountMenu;
