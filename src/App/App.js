import React, { Suspense, lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from "react-helmet";
import Spin from 'antd/lib/spin';
import { Layout } from 'antd';
import { setIsMobile } from './utils';
import './App.css';

const Navbar = lazy(() => import('../Navbar/Navbar'));

const { Content, Header } = Layout;

const App = (props) => {

  const isMobile = useMediaQuery({query: '(max-device-width: 768px)'});
  const contentClass = "content-container" + (isMobile ? " mobile": "");
  setIsMobile(isMobile);

  const { children } = props;


  const navProps = {
    mobile: isMobile,
    blogName: "UTNIANOS",
    notificationsEnabled: false,
    notifications: [],
  };

  return (
  <>

   <Helmet>
      <meta charset="utf-8" />
      <meta name="description" content="" />
      <title>UTNianos</title>
    </Helmet>

    <Layout data-testid="app-layout">

      <Suspense fallback={<Spin />}>
        <Header className="page-header-container">
           <Navbar {...navProps} />
        </Header>
      </Suspense>

      <Suspense fallback={<Spin />} className="app-layout">
        <Content className={contentClass} data-testid="content-container">
           {children}
        </Content>
      </Suspense>
    </Layout>

    <br />

  </>
  );

}

export default App;
