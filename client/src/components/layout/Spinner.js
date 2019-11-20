import React from 'react';
import spinner from '../img/spinner.gif';

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={spinner} alt='Cargando...'></img>
    </div>
  );
};

export default Spinner;
