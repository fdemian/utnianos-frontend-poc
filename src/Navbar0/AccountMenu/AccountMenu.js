import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Spin } from 'antd';
import AccountAvatar from '../../UserAvatar/UserAvatar';

// Font awesome icons.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus as plus,
  faAddressCard as addressCard,
  faCog as cog,
  faSignOutAlt as signOut,
  faPenNib as draftIcon
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../Login/utils';
import './AccountMenu.css';

const AccountMenu = ({ mutate, user, isFetching }) => {

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
      <Menu.Item key="account:newstory">
        <Link to="/stories/new">
          <FontAwesomeIcon
            icon={plus}
            className="MenuIcon"
            size="lg"
          />
          &nbsp; New Story
        </Link>
      </Menu.Item>
      <Menu.Item key="account:categories">
        <Link to="/categories">
         <FontAwesomeIcon
            icon={addressCard}
            className="MenuIcon"
            size="lg"
          />
          &nbsp; Categories
        </Link>
      </Menu.Item>
      <Menu.Item key="account:draft">
        <Link to="/drafts">
          <FontAwesomeIcon
            icon={draftIcon}
            className="MenuIcon"
            size="lg"
          />
          &nbsp; Drafts
        </Link>
      </Menu.Item>
      <Menu.Item key="account:settings">
        <Link to="/settings">
          <FontAwesomeIcon
            icon={cog}
            className="MenuIcon"
            size="lg"
          />
          &nbsp; Settings
        </Link>
      </Menu.Item>
      <Menu.Item key="account:logout">
        <span
          data-testid="logout-button"
          onClick={() => {
            logout();
            mutate(null);
          }}>
          <FontAwesomeIcon
            icon={signOut}
            className="MenuIcon"
            size="lg"
          />
          &nbsp; Log out
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
