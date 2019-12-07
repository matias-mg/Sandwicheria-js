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
        <li>¡Hola {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</li>
      ) : (
          <Fragment>
            <ul>
              <li>
                <Link to="/"><i class="far fa-paper-plane"></i> Ordenes</Link>
              </li>
              <li>
                <Link to="/administrar"><i class="far fa-edit"></i> Administración</Link>
              </li>
            </ul>
          </Fragment>
        )}

      <a href='#!' onClick={onLogout}>
        <Link to="/login"><i className='fas fa-sign-out-alt mr-1'></i> Cerrar Sesión</Link>
      </a>
    </Fragment>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'><i class="fas fa-user-plus mr-1"></i> Registro</Link>
      </li>
      <li>
        <Link to='/login'><i class="fas fa-sign-in-alt mr-2"></i> Iniciar sesión</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar'>
      <div className='container-nav'>
        <h1>
          <i className='fas fa-utensils'></i> Sandwichería JS
        </h1>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;
