import React, { useReducer } from 'react';
import FoodOrderContext from './foodOrderContext';
import foodOrderReducer from './foodOrderReducer';
import { ADD_FOODORDER, CANCEL_FOODORDER } from '../types';

const FoodOrderState = props => {
    const initialState = {
        foodOrders: [
            {
                id: 3,
                name: "Promo Sandwich",
                category: "Sandwich",
                description: "Rico Sandwich a lo pobre + bebida en lata.",
                price: 5000,
                orderDetails: 'Sin salsa de teriyaki, por favor!!',
                status: "lista para retirar"
            }
        ]
    };


    const [state, dispatch] = useReducer(foodOrderReducer, initialState);

    // Add Food order
    const addOrder = (foodMenu) => {
        dispatch({ type: ADD_FOODORDER, payload: foodMenu });
    }

    // Cancel food order
    const cancelOrder = (id) => {
        dispatch({ type: CANCEL_FOODORDER, payload: id });
    }

    return (
        <FoodOrderContext.Provider value={{ foodOrders: state.foodOrders, addOrder, cancelOrder }}>
            {props.children}
        </FoodOrderContext.Provider>
    )
}

export default FoodOrderState;