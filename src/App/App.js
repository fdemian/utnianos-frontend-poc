import React from 'react';
import Navbar from '../Navbar/Navbar';
import { isLoggedIn } from '../Login/utils';
import './App.css';

const App = ({children}) => {
  const loggedIn = isLoggedIn();
  
  return(
  <>
    <Navbar mobile={false} loggedIn={loggedIn} />
    <h1 className="title-text">FEATURES POC</h1>
    <br />
    <div>
      {children}
    </div>
  </>
  )
}

export default App;
