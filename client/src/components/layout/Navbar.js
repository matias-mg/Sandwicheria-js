import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import FoodOrderContext from '../../context/foodorder/foodOrderContext';

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const foodOrderContext = useContext(FoodOrderContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearOrders } = foodOrderContext;

  const onLogout = () => {
    logout();
    clearOrders();
  };

  const authLinks = (
    <Fragment>
      {user && user.userType === 0 ? (
        <li>¡Hola {user && user.name}!</li>
      ) : (
        <li>
          <Link to="/">Ordenes</Link>
          <Link to="/administrar">Administración</Link>
        </li>
      )}

      <li>
        <a href='#!' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>
          <Link to="/login">Cerrar Sesión</Link>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Registro</Link>
      </li>
      <li>
        <Link to='/login'>Iniciar sesión</Link>
      </li>
    </Fragment>
  );
  return (
    <nav className='navbar'>
      <div className='container-nav'>
        <h1>
          <i className='fas fa-utensils'></i> Sandwichería JS
        </h1>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
