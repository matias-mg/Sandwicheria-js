import React, { useContext, useEffect } from 'react';
import FoodMenus from '../foodMenu/FoodMenus';
import FoodOrders from '../foodMenu/client/FoodOrders';
import AuthContext from '../../context/auth/authContext';

function Home() {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser()
        // eslint-disabled-next-line
    }, [])
    return (
        <div className="grid-2 mt-1">
            <div>
                <h2>Promociones Disponibles</h2>
                <FoodMenus />
            </div>
            <div>
                <h2>Tus Pedidos</h2>
                <FoodOrders />
            </div>
        </div>
    )
}

export default Home
