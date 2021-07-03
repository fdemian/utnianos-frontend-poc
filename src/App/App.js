import React from 'react';
import Navbar from '../Navbar0/Navbar';
import './App.css';

const App = ({children}) => {
  return(
  <>
    <Navbar mobile={false} loggedIn={true} />
    <h1 className="title-text">FEATURES POC</h1>
    <br />
    <div>
      {children}
    </div>
  </>
  )
}

export default App;
