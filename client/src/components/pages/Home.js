import React, { Fragment, useContext, useEffect } from 'react';
import FoodMenus from '../foodMenu/FoodMenus';
import FoodOrders from '../foodMenu/client/FoodOrders';
import AuthContext from '../../context/auth/authContext';
import FoodMenuForm from '../foodMenu/admin/FoodMenuForm';

function Home() {
    const authContext = useContext(AuthContext);

    const { user, loadUser } = authContext;
    useEffect(() => {
        loadUser()
        // eslint-disabled-next-line
    }, [])
    return (
        <div className="grid-2 mt-1">
            {user && user.userType === 0 ? 
            <Fragment className="grid-2">
                <div>
                    <h2>Promociones Disponibles</h2>
                    <FoodMenus />
                </div>
                <div>
                    <h2>Tus Pedidos</h2>
                    <FoodOrders />
                </div>
            </Fragment>
            :
            <Fragment className="grid-2">
                <div>
                    <h2>Pedidos Pendientes</h2>
                    <FoodOrders />
                </div>
                <div>
                    <h2>Control de Pedidos</h2>
                    <FoodMenuForm />
                </div>
            </Fragment>
            }
            
        </div>
    )
}

export default Home
