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

  if (foodOrders !== null && foodOrders.length === 0 && !loading) {
    return (
      <h4 className='card bg-order text-center text-dark'>No tienes ningún pedido en espera...</h4>
    );
  }

  return (
    <Fragment>
      {foodOrders !== null && !loading ? (
        <TransitionGroup>
          {foodOrders.length > 0 &&
            !loading &&
            foodOrders.map(foodOrder => 
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
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
}

export default FoodOrders;
