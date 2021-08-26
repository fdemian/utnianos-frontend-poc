import React from 'react';
import { Link } from 'react-router-dom';
import Menu from 'antd/es/menu';
import Dropdown from 'antd/es/dropdown';
import Spin from 'antd/es/spin';
import AccountAvatar from '../../UserAvatar/UserAvatar';

// Font awesome icons.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog as cog,
  faSignOutAlt as signOut,
} from '@fortawesome/free-solid-svg-icons';
import './AccountMenu.css';

const AccountMenu = ({ user, logoutFn, isFetching }) => {

  if(user === undefined)
    return <Spin />;

  const menu = (
    <Menu className="AccountDropdownMenu">
      <Menu.Item key="account:0" disabled={true}>
        <AccountAvatar
          avatar={user.avatar}
          username={user.username}
          shape='circle'
          size='medium'
        />
        <span className="username-menu-text">
          {user.username}
        </span>
      </Menu.Item>
      <hr className="divider" />
      <Menu.Item key="account:settings">
        <Link to="/settings">
          <FontAwesomeIcon
            icon={cog}
            className="MenuIcon"
            size="lg"
          />
          &nbsp; Ajustes
        </Link>
      </Menu.Item>
      <Menu.Item key="account:logout">
        <span
          data-testid="logout-button"
          onClick={logoutFn}>
          <FontAwesomeIcon
            icon={signOut}
            className="MenuIcon"
            size="lg"
          />
          &nbsp; Cerrar sesión
        </span>
      </Menu.Item>
    </Menu>
  );

  return(
  <Dropdown
    overlay={menu}
    placement="bottomCenter"
  >
    <span className="UserMenuAvatar">
      <AccountAvatar
        avatar={user.avatar}
        username={user.username}
        size='medium'
        shape='circle'
      />
      <span className="navbar-text">
          {user.username}
      </span>
    </span>
  </Dropdown>
  )

}

export default AccountMenu;
