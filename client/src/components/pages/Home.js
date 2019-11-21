import React, { Fragment, useContext, useEffect, useState } from 'react';
import FoodMenus from '../foodMenu/FoodMenus';
import FoodOrders from '../foodMenu/client/FoodOrders';
import AuthContext from '../../context/auth/authContext';
import FoodOrderContext from '../../context/foodorder/foodOrderContext';
import FoodMenuForm from '../foodMenu/admin/FoodMenuForm';
import Spinner from '../../components/layout/Spinner';

function Home() {
    const authContext = useContext(AuthContext);
    const foodOrderContext = useContext(FoodOrderContext);

    const { user, loadUser } = authContext;
    const { loading } = foodOrderContext;

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    const [state, setState] = useState(false)

    return (
        <Fragment>
            {user && !loading ? user && !loading && user.userType === 0 ? 
            <div className="grid-2">
                <div>
                    <h2>Promociones Disponibles</h2>
                    <FoodMenus />
                </div>
                <div>
                    <div className="history">
                        <h2 className={state === false && 'active'} onClick={() => setState(false)}>Pedidos Activos</h2>
                        <h2 className={state === true && 'active'} onClick={() => setState(true)}>Historial de Pedidos</h2>
                    </div>
                    <FoodOrders onProcess={true} />
                </div>
            </div>
            :
            <div className="grid-2">
                <div>
                    <h2>Pedidos Pendientes</h2>
                    <FoodOrders onProcess={false} />
                </div>
                <div>
                    <h2>Control de Pedidos</h2>
                    <FoodOrders onProcess={true} />
                </div>
            </div>
             : <Spinner />}
        </Fragment>
    )
}

export default Home
