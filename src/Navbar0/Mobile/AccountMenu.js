import React, {
  lazy,
  Suspense
} from 'react';
import Menu from 'antd/lib/menu';
import Spin from 'antd/lib/spin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus as plus,
  faAddressCard as addressCard,
  faCog as cog,
  faSignOutAlt as signOut,
  faBell as bellIcon,
  faBellSlash as bellSlashIcon,
  faUser as userIcon
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const NotificationsHeader = lazy(() => import('../AccountMenu/NotificationsMenu/NotificationsMenuHeader'));

const SubMenu = Menu.SubMenu;

const AccountMenu = (props) => {

  const {
    notificationsEnabled,
    notifications,
    logoutFn,
    closeDrawer
  } = props;

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
              &nbsp; User
            </strong>
          }>
          <Menu.Item key="UserMenu:1" onClick={closeDrawer} className="MenuItem">
            <Link to="/stories/new">
              <FontAwesomeIcon
                icon={plus}
                className="MenuIcon"
                size="lg"
              />
              &nbsp; New Story
            </Link>
          </Menu.Item>
          <Menu.Item key="UserMenu:2" onClick={closeDrawer} className="MenuItem">
            <Link to="/categories">
             <FontAwesomeIcon
                icon={addressCard}
                className="MenuIcon"
                size="lg"
              />
              &nbsp; Categories
            </Link>
          </Menu.Item>
          <Menu.Item key="UserMenu:3" onClick={closeDrawer} className="MenuItem">
            <Link to="/settings">
              <FontAwesomeIcon
                icon={cog}
                className="MenuIcon"
                size="lg"
              />
              &nbsp; Settings
            </Link>
          </Menu.Item>
          <Menu.Item key="UserMenu:4" onClick={closeDrawer} className="MenuItem">
            <span onClick={logoutFn}>
              <FontAwesomeIcon
                icon={signOut}
                className="MenuIcon"
                size="lg"
              />
              &nbsp; Log out
            </span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="NotificationsMenu"
          title={
           notificationsEnabled ?
           <strong className="sidemenu-style-title">
             <FontAwesomeIcon icon={bellIcon} size="lg" />
              &nbsp; Notifications
            </strong> :
           <strong className="sidemenu-style-title">
            <FontAwesomeIcon icon={bellSlashIcon} size="lg" />
             &nbsp; Notifications disabled
           </strong>
          }
          disabled={!notificationsEnabled}
          >
          <Menu.Item
            key="NotificationsMenu:number"
            disabled={notifications.length === 0}
            className="MenuItem"
           >
            {notifications.length === 0 ?
              'No unread notifications' :
              <Suspense fallback={<Spin />}>
                <NotificationsHeader
                   notifications={notifications}
                   enabled={true}
                />
              </Suspense>
            }
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Suspense>
  </div>
  )
};

export default AccountMenu;
