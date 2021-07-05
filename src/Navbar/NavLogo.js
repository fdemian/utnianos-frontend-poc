import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import logo from './logo.png';

const NavLogo = ({mobile, blogName}) => (
  <Suspense fallback={<Spin />}>
     <Link to="/" className="topnav header-logo">
       <img
         src={logo}
         alt={blogName + " logo"}
         className={mobile ? "navbar-logo-mobile" : "blog-logo"}
        />
     </Link>
  </Suspense>
);

export default NavLogo;
