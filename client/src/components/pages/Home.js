import React, { Fragment, useContext, useEffect, useState } from 'react';
import FoodMenus from '../foodMenu/FoodMenus';
import FoodOrders from '../foodOrder/FoodOrders';
import FoodOrderFilter from '../foodOrder/FoodOrderFilter'
import AuthContext from '../../context/auth/authContext';
import FoodOrderContext from '../../context/foodorder/foodOrderContext';
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
                    <div className="container-scroll">
                        <div className="history">
                            <h2 className={state === false && 'active'} onClick={() => setState(false)}>Pedidos Activos</h2>
                            <h2 className={state === true && 'active'} onClick={() => setState(true)}>Historial de Pedidos</h2>
                        </div>
                        <FoodOrderFilter />
                        <FoodOrders onProcess={true} checkHistory={state} />
                    </div>
                </div>
                :
                <div className="grid-2">
                    <div>
                        <h2>Pedidos Pendientes</h2>
                        <FoodOrders onProcess={false} checkHistory={state} />
                    </div>
                    <div>
                        <div className="history">
                            <h2 className={state === false && 'active'} onClick={() => setState(false)}>Control de Pedidos</h2>
                            <h2 className={state === true && 'active'} onClick={() => setState(true)}>Historial de Pedidos</h2>
                        </div>
                        <FoodOrderFilter />
                        <FoodOrders onProcess={true} checkHistory={state} />
                    </div>
                </div>
                : <Spinner />}
        </Fragment>
    )
}

export default Home
