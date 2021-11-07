import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../logo.png';
import { getIsMobile } from '../App/utils';

const UnloggedHome = () => {

  const isMobile = getIsMobile();

  return (
  <div className={`unlogged-home-container${isMobile ? "-mobile": ""}`}>
    <img
      src={logo}
      alt="utnianos logo"
      width={isMobile ? 237: 592}
      height={isMobile ? 54: 134}
    />
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
