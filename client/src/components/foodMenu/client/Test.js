import React, { Fragment, useContext, useEffect } from 'react';
import FoodOrderContext from '../../../context/foodorder/foodOrderContext';
import AuthContext from '../../../context/auth/authContext';
import FoodOrderItem from './FoodOrderItem';
import Spinner from '../../layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function FoodOrders(props) {
    const foodOrderContext = useContext(FoodOrderContext);
    const authContext = useContext(AuthContext);
    const { foodOrders, getFoodOrders, loading } = foodOrderContext;

    useEffect(() => {
        getFoodOrders();
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    const orderComponent = () => { }

    if (foodOrders !== null && foodOrders.length === 0 && !loading) {
        return (
            <h4 className='card bg-order text-center text-dark'>No tienes ningún pedido en espera...</h4>
        );
    }

    if (props.history === false) {

    }
    return (
        <Fragment>
            {foodOrders !== null && !loading ? (
                <TransitionGroup>
                    {foodOrders.length > 0 &&
                        foodOrders.map(foodOrder =>
                            authContext.user && authContext.user.userType === 1 ?
                                foodOrder.status === 'en espera' && props.onProcess === false ?
                                    (
                                        <CSSTransition key={foodOrder._id} timeout={500} classNames='item'>
                                            <FoodOrderItem foodOrder={foodOrder} />
                                        </CSSTransition>
                                    ) : foodOrder.status !== 'en espera' && props.onProcess === true &&
                                    (
                                        <CSSTransition key={foodOrder._id} timeout={500} classNames='item'>
                                            <FoodOrderItem foodOrder={foodOrder} />
                                        </CSSTransition>
                                    )
                                :
                                props.checkHistory === false && foodOrder.status !== 'finalizado' &&
                                <CSSTransition key={foodOrder._id} timeout={500} classNames='item'>
                                    <FoodOrderItem foodOrder={foodOrder} />
                                </CSSTransition>
                        )}
                </TransitionGroup>
            ) : (
                    <Spinner />
                )}
        </Fragment>
    );
}

export default FoodOrders;
