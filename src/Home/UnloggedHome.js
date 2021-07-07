import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../logo.png';

const UnloggedHome = () => {
  return (
  <div className="unlogged-home-container">
    <img src={logo} alt="utnianos logo" />
    <p style={{fontSize:'30px'}}>Bienvenido!</p>
    <p style={{fontSize:'20px'}}>
      En este sitio vas a poder seguir tu progreso académico, ver apuntes y más.
    </p>
    <p style={{fontSize:'20px'}}>
      <Link to="/login">Inicia sesión</Link> o <Link to="/register">registrate</Link> si no tenés un usuario.
    </p>
  </div>
  );
}

export default UnloggedHome;
