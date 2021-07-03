import React, {
  lazy,
  useState,
  Suspense
} from 'react';

//Ant. design.
import Drawer from 'antd/lib/drawer';
import Row  from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from 'antd/lib/spin';
import NavLogo from './NavLogo';

// Other imports.
import { Link } from 'react-router-dom'; // Replace
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

// Lazy imports.
const AccountAvatar = lazy(() => import('../UserAvatar/UserAvatar'));
const NavbarMenu = lazy(() => import('./Mobile/MobileMenu'));

const Navbar = (props) => {

 const [drawerVisible, setDrawerVisible] = useState(false);
 const closeDrawer = () => setDrawerVisible(false);
 const openDrawer = () => setDrawerVisible(true);

 const {
   loggedIn,
   user,
   notifications,
   notificationsEnabled,
   dismissNotifications
 } = props;

 return (
 <Suspense fallback={<Spin />}>
   <div className="navbar-container navbar-mobile">
     <Drawer
       visible={drawerVisible}
       placement="right"
       onClose={closeDrawer}
       title={
         loggedIn ?
         <Suspense fallback={<Spin />}>
             <AccountAvatar
               avatar={user.avatar}
               username={user.username}
               size='small'
             />
             <strong className="menu-title">
                {user.username}
             </strong>
          </Suspense>
         : null
       }
       className="drawer-navbar"
     >
      <Suspense fallback={<Spin />}>
         <NavbarMenu
           loggedIn={loggedIn}
           notifications={notifications}
           notificationsEnabled={notificationsEnabled}
           user={user}
           clearFn={dismissNotifications}
           closeDrawer={closeDrawer}
           setDrawerVisible={setDrawerVisible}
         />
       </Suspense>
     </Drawer>
     <Row gutter={4}>
       <Col className="gutter-row" span={4}>
          <NavLogo mobile={true} blogName={props.blogName} />
       </Col>
       <Col className="gutter-row" span={16}></Col>
       <Col className="gutter-row" span={4}>
         <span onClick={openDrawer}>
           <FontAwesomeIcon
               icon={faBars}
               size="lg"
               color="gainsboro"
            />
         </span>
       </Col>
     </Row>
   </div>
 </Suspense>
 );

}

export default Navbar;
