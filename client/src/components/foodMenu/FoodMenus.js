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

    const { user } = authContext;
    
    useEffect(() => {
        getFoodMenus();
        authContext.loadUser()
        // eslint-disabled-next-line
    }, [])

    return (
        <Fragment>
            {foodMenus !== null && !loading ? (
                <TransitionGroup>
                    {foodMenus.length > 0 && !loading ?
                        user &&  
                        foodMenus.map(foodMenu => <FoodMenuItem key={foodMenu.id} foodMenu={foodMenu} />)
                        :
                            <Spinner />
                        }
                </TransitionGroup>
            ) : <h4 className="card bg-order text-center text-dark">Por el momento, no existe ninguna promoción disponible...</h4>}
        </Fragment>
    )
}

export default FoodMenus


