import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../logo.png';
import { getIsMobile } from '../App/utils';

const UnloggedHome = () => {

  const isMobile = getIsMobile();
  const cssClass = `unlogged-home-container${isMobile ? "-mobile": ""}`;

  return (
  <div className={cssClass}>
    { isMobile ? null :
    <img
      src={logo}
      alt="utnianos logo"
      width={592}
      height={134}
    />
    }
    <p className="home-welcome-text">Bienvenido!</p>
    <p className="home-paragraph">
      En este sitio vas a poder seguir tu progreso académico, ver apuntes y más.
    </p>
    <p className="home-paragraph">
      <Link to="/login">Inicia sesión</Link> o <Link to="/register">registrate</Link> si no tenés un usuario.
    </p>
  </div>
  );
}

export default UnloggedHome;
