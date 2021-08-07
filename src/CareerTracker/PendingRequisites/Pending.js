import React from 'react';
import DisplayList from './DisplayList';

const Pendientes = ({ course, final }) => {
  return (
    <div>
      <strong>Esta materia tiene como correlativas:</strong>
      <div>
        <DisplayList title="Con cursada: " list={course} />
      </div>
      <div>
        <DisplayList title="Con final: " list={final} />
      </div>
    </div>
  );
}

export default Pendientes;
