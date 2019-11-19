import React, { Fragment, useContext, useEffect } from 'react'
import FoodOrderContext from '../../../context/foodorder/foodOrderContext';
import FoodOrderItem from './FoodOrderItem';
import Spinner from '../../layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function FoodOrders() {
    const foodOrderContext = useContext(FoodOrderContext);
    const { foodOrders, getFoodOrders, loading } = foodOrderContext;

    useEffect(() => {
        getFoodOrders();
        // eslint-disabled-next-line
    }, [])

    return (
        <Fragment>
            {foodOrders !== null && !loading ? (
                <TransitionGroup>
                    {foodOrders.length > 0 ?
                        foodOrders.map(foodOrder =>
                            <CSSTransition key={foodOrder._id} timeout={500} classNames="item" >
                                <FoodOrderItem foodOrder={foodOrder} />
                            </CSSTransition>)
                        :
                            <h4 className="card bg-order text-center text-dark">No tienes ningún pedido en espera...</h4>
                        }
                </TransitionGroup>
            ) : <Spinner />}

        </Fragment>
    )
}

export default FoodOrders