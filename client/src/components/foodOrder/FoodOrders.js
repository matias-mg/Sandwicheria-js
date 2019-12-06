import React, { Fragment, useContext, useEffect } from 'react';
import FoodOrderContext from '../../context/foodorder/foodOrderContext';
import AuthContext from '../../context/auth/authContext';
import FoodOrderItem from '../foodOrder/FoodOrderItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function FoodOrders(props) {
  const foodOrderContext = useContext(FoodOrderContext);
  const authContext = useContext(AuthContext);
  const { foodOrders, getFoodOrders, loading, filtered } = foodOrderContext;
  const { user, loadUser } = authContext;

  let checkFoodOrders = [];

  if (foodOrders !== null && !loading) {
    checkFoodOrders = [...foodOrders];
  } else {
    checkFoodOrders = [];
  }

  useEffect(() => {
    getFoodOrders();
    loadUser();
    // eslint-disable-next-line
  }, [props.checkHistory]);

  // Check if food orders is really empty
  if (foodOrders !== null && !loading && props.checkHistory === false &&
    [...checkFoodOrders].filter(fo => fo.status !== "finalizado").length === 0) {
    return (
      <h4 className='card bg-order text-center text-dark'>No tienes ningún pedido en espera...</h4>
    );
  }

  if (user && user.userType === 1) {
    return (
      <Fragment>
        <TransitionGroup>
          { // Check for prop "onProcess" and if isn't true, renders only "en espera" orders
            props.onProcess === false && foodOrders !== null ? foodOrders.map(order => (
              order.status === 'en espera' &&
              <CSSTransition key={order._id} timeout={500} classNames='item'>
                <FoodOrderItem foodOrder={order} />
              </CSSTransition>
            ))
              :
              // If prop "onProcess" equals true, first check if FILTERED is null
              props.onProcess === true && foodOrders !== null  ?
                props.checkHistory === false ?
                  // Check if filtered have something, then for they that aren't "en espera" or "finalizado" and renders it
                  filtered !== null ? filtered.map(order => (
                    order.status !== 'en espera' && order.status !== 'finalizado' &&
                    <CSSTransition key={order._id} timeout={500} classNames='item'>
                      <FoodOrderItem foodOrder={order} />
                    </CSSTransition>
                  ))
                    :
                    // If filtered have nothing, renders normally
                    foodOrders.map(order => (
                      order.status !== 'en espera' && order.status !== 'finalizado' &&
                      <CSSTransition key={order._id} timeout={500} classNames='item'>
                        <FoodOrderItem foodOrder={order} />
                      </CSSTransition>
                    ))
                  :
                  // If prop "checkHistory" is true, checks if filtered have something, if not, renders normally
                  filtered !== null ? filtered.map(order => (
                    order.status === 'finalizado' &&
                    <CSSTransition key={order._id} timeout={500} classNames='item'>
                      <FoodOrderItem foodOrder={order} />
                    </CSSTransition>
                  ))
                  :
                  foodOrders.map(order => (
                    order.status === 'finalizado' &&
                    <CSSTransition key={order._id} timeout={500} classNames='item'>
                      <FoodOrderItem foodOrder={order} />
                    </CSSTransition>
                  ))
                :
                ''}
        </TransitionGroup>
      </Fragment>
    );
  } else if (user && user.userType === 0) {
    // Check for Client user type 
    return (
      <Fragment>
        <TransitionGroup>
          {
            foodOrders !== null ?
            props.checkHistory === false ?
              // Check if filtered have something, then for they that aren't "en espera" or "finalizado" and renders it
              filtered !== null ? filtered.map(order => (
                order.status !== 'finalizado' &&
                <CSSTransition exit={false} key={order._id} timeout={500} classNames='item'>
                  <FoodOrderItem foodOrder={order} />
                </CSSTransition>
              ))
                :
                // If filtered have nothing, renders orders without status of "finalizado"
                foodOrders.map(order => (
                  order.status !== 'finalizado' &&
                  <CSSTransition exit={false} key={order._id} timeout={500} classNames='item'>
                    <FoodOrderItem foodOrder={order} />
                  </CSSTransition>
                ))
              :
              // If prop "checkHistory" is true, checks if filtered have something, if not, renders normally
              filtered !== null ? filtered.map(order => (
                order.status === 'finalizado' &&
                <CSSTransition exit={false} key={order._id} timeout={500} classNames='item'>
                  <FoodOrderItem foodOrder={order} />
                </CSSTransition>
              ))
              :
              foodOrders.map(order => (
                order.status === 'finalizado' &&
                <CSSTransition exit={false} key={order._id} timeout={500} classNames='item'>
                  <FoodOrderItem foodOrder={order} />
                </CSSTransition>
              ))
            :
            ''
          }
        </TransitionGroup>
      </Fragment>
    )
  }

}

export default FoodOrders;