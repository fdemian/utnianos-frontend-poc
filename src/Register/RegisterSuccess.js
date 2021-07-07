import React from 'react';
//import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck as okIcon,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Register.css';

const RegisterSuccess = () => {
  
  return (
  <div className="register-success-container">
    <p className="register-success-title">
      Exito!
    </p>
    <span className="register-success-icon">
      <FontAwesomeIcon icon={okIcon} size="5x" color="green" />
    </span>
    <p className="register-success-text">
      Te has registrado exitosamente en el foro.
    </p>
    <p className="register-success-text">
      Tal vez quieras <Link to="/login">ingresar al sitio</Link> ahora, o <Link to="/">volver</Link> a la página de inicio.
    </p>
  </div>
  );
}

export default RegisterSuccess;
