import React from 'react';

const DisplayList = ({ title, list }) => {
  if (list.length === 0) { return null; }

  return (
  <>
    <p>{title}</p>

    <ul>
      {list.map((pendiente) => (
        <li key={pendiente.code}>
          {pendiente.name}
        </li>
      ))}
    </ul>
  </>
  );
}

export default DisplayList;
