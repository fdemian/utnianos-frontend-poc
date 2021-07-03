import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import logo from './logo.png';

const NavLogo = ({mobile, blogName}) => (
  <Suspense fallback={<Spin />}>
     <Link to="/" className="topnav header-logo">
       <img
          width={mobile ? 93 : 96}
          height={mobile ? 30 : 31.17}
          src={logo}
          alt={blogName + " logo"}
          className={mobile ? "navbar-logo-mobile" : "blog-logo"}
        />
     </Link>
  </Suspense>
);

export default NavLogo;
