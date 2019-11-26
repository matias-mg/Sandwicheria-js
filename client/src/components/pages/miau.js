import React, { Fragment, useContext, useEffect } from 'react';
import FoodOrderContext from '../../context/foodorder/foodOrderContext';
import AuthContext from '../../context/auth/authContext';
import FoodOrderItem from '../foodOrder/FoodOrderItem';
import Spinner from '../layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function FoodOrders(props) {
  const foodOrderContext = useContext(FoodOrderContext);
  const authContext = useContext(AuthContext);
  const { foodOrders, getFoodOrders, loading, filtered } = foodOrderContext;

  let checkFoodOrders = [];

  if(foodOrders !== null && !loading) {
    checkFoodOrders = [...foodOrders];
  } else {
    checkFoodOrders = [];
  }

  useEffect(() => {
    getFoodOrders();
    authContext.loadUser();
    // eslint-disable-next-line
  }, [props.checkHistory]);


  if (foodOrders !== null && !loading && props.checkHistory === false && 
    [...checkFoodOrders].filter(fo => fo.status !== "finalizado").length === 0) {
    return (
      <h4 className='card bg-order text-center text-dark'>No tienes ningún pedido en espera...</h4>
    );
  }

  return (
    <Fragment>
      {/* Check if request to Node is still loading */}
      {foodOrders !== null && !loading ? (
        <TransitionGroup>
          {foodOrders.length > 0 &&
            foodOrders.map(foodOrder =>
              // Check if user exists (still not loading) and if it's true, check for
              // "onProcess" prop, if it's true, it will check only for awaitings orders
              authContext.user && authContext.user.userType === 1 ?
                foodOrder.status === 'en espera' && props.onProcess === false ?
                  (
                    <CSSTransition key={foodOrder._id} timeout={100000} classNames='item'>
                      <FoodOrderItem foodOrder={foodOrder} />
                    </CSSTransition>
                  ) : foodOrder.status !== 'en espera' && props.checkHistory === false && foodOrder.status !== 'finalizado' && props.onProcess === true ?
                  (
                    <CSSTransition exit={false} key={foodOrder._id} timeout={500} classNames='item'>
                      <FoodOrderItem foodOrder={foodOrder} />
                    </CSSTransition>
                  )
                  :
                  foodOrder.status !== 'en espera' && props.checkHistory === true && foodOrder.status === 'finalizado' && props.onProcess === true &&
                  (
                    <CSSTransition key={foodOrder._id} timeout={500} classNames='item'>
                      <FoodOrderItem foodOrder={foodOrder} />
                    </CSSTransition>
                  )
                :
                // Validation in client side, if "checkHistory" prop === true, means
                // client wants to check his/her history of requests
                props.checkHistory === false && foodOrder.status !== 'finalizado' ?
                <CSSTransition exit={false} key={foodOrder._id} timeout={300} classNames='item'>
                  <FoodOrderItem foodOrder={foodOrder} />
                </CSSTransition>
                :
                props.checkHistory === true && foodOrder.status === 'finalizado' &&
                <CSSTransition exit={false} key={foodOrder._id} timeout={500} classNames='item'>
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
