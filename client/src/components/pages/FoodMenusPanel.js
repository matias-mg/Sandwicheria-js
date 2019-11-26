import React, { useContext, useEffect } from 'react';
import FoodMenus from '../foodMenu/FoodMenus';
import AuthContext from '../../context/auth/authContext';
import FoodMenuForm from '../foodOrder/FoodMenuForm';

function FoodMenusPanel() {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className='grid-2 mt-1'>
        <div>
          <h2>Promociones Vigentes</h2>
          <FoodMenus />
        </div>
        <div>
          <h2>Control de Promociones</h2>
          <FoodMenuForm />
        </div>
    </div>
  );
}

export default FoodMenusPanel;
