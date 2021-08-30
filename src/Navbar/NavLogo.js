import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const NavLogo = ({mobile, blogName}) => (
   <Link
      to="/"
      role="link"
      className="topnav header-logo"
    >
     <img
       src={logo}
       alt={blogName + " logo"}
       className={mobile ? "navbar-logo-mobile" : "blog-logo"}
       height={mobile ? 30 : 50}
       width={mobile ? 93 : 220}
      />
   </Link>
);

export default NavLogo;
