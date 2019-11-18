import React, { Fragment, useContext } from 'react'
import FoodOrderContext from '../../../context/foodorder/foodOrderContext';
import FoodOrderItem from './FoodOrderItem';

function FoodOrders() {
    const foodOrderContext = useContext(FoodOrderContext);

    return (
        <Fragment>
            <h2>Tus pedidos</h2>
            {foodOrderContext.foodOrders.length > 0 ?
             foodOrderContext.foodOrders.map(foodOrder => <FoodOrderItem key={foodOrder.id} foodOrder={foodOrder} />) 
             :
              <h4 className="card bg-order text-center text-dark">No tienes ningún pedido en espera...</h4>}
        </Fragment>
    )
}

export default FoodOrders