import React, { Suspense, lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from "react-helmet";
import Spin from 'antd/lib/spin';
import { Layout } from 'antd';
import './App.css';

const Navbar = lazy(() => import('../Navbar/Navbar'));

const { Content, Header } = Layout;

const App = (props) => {

  // Fetch user data.
  // Fetch config data.
  //const { config, error } = useConfig();

  // Fetch media data.
  //const { description, blogName } = config;
  const isMobile = useMediaQuery({query: '(max-device-width: 500px)'});
  const contentClass = "content-container" + (isMobile ? " mobile": "");
  const { children } = props;

  /*
  if(loggedIn) {
    loadWebsocket();
  }

  if(error || !config || (loggedIn && !user))
    return null;
  */

  const navProps = {
    mobile: isMobile,
    blogName: "UTNIANOS",
    /*config: config,
    isFetching: isLoading && userId!==null,
    */
    notificationsEnabled: false,
    notifications: [],
  };

  return (
  <>

   <Helmet>
      <meta charset="utf-8" />
      <meta name="description" content="" />
      <title>Utnianos</title>
    </Helmet>

    <Layout data-testid="app-layout">

      <Suspense fallback={<Spin />}>
        <Header className="page-header-container">
           <Navbar {...navProps} />
        </Header>
      </Suspense>

      <Suspense fallback={<Spin />}>
        <Content className={contentClass} data-testid="content-container">
           {children}
        </Content>
      </Suspense>
    </Layout>

  </>
  );

}

export default App;
