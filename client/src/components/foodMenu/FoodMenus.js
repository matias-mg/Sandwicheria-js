import React, { Fragment, useContext, useEffect } from 'react'
import FoodMenuContext from '../../context/foodmenu/foodMenuContext';
import FoodMenuItem from './FoodMenuItem';
import AdminFoodMenuItem from './admin/AdminFoodMenuItem';
import AuthContext from '../../context/auth/authContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

function FoodMenus() {
    const foodMenuContext = useContext(FoodMenuContext);
    const authContext = useContext(AuthContext);

    const { foodMenus, getFoodMenus, loading } = foodMenuContext;

    useEffect(() => {
        getFoodMenus();
        authContext.loadUser()
        // eslint-disabled-next-line
    }, [])

    const { user } = authContext;
    return (
        <Fragment>
            {foodMenus !== null && !loading ? (
                <TransitionGroup>
                    {foodMenus.length > 0 ?
                        user && authContext.user.userType === 0 ? 
                        foodMenuContext.foodMenus.map(foodMenu => <FoodMenuItem key={foodMenu.id} foodMenu={foodMenu} />)
                        :
                        foodMenuContext.foodMenus.map(foodMenu => <AdminFoodMenuItem key={foodMenu.id} foodMenu={foodMenu} />)
                        :
                            <Spinner />
                        }
                </TransitionGroup>
            ) : <h4 className="card bg-order text-center text-dark">No tienes ningún pedido en espera...</h4>}
        </Fragment>
    )
}

export default FoodMenus


