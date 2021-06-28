import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt as signIn } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () =>  (
 <Menu
   mode="horizontal"
   key="parent.menu.not.logged"
   role="menu"
   aria-label="Navbar"
   className="desktop-menu"
 >
  <Menu.Item key="logo" disabled>
    <Link to="/">
      <h1>UTN Proof of Concept</h1>
    </Link>
  </Menu.Item>
  <span className="login-items"  role="menuitem">
    <Link to="/login">
      <FontAwesomeIcon icon={signIn} />
      Login
    </Link>
  </span>
</Menu>
);

export default Navbar;
