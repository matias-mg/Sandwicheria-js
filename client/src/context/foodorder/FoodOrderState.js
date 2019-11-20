import React, { useReducer } from 'react';
import axios from 'axios';
import FoodOrderContext from './foodOrderContext';
import foodOrderReducer from './foodOrderReducer';
import {
    ADD_FOODORDER,
    CANCEL_FOODORDER,
    FOODORDER_ERROR,
    GET_FOODORDERS,
    CLEAR_FOODORDERS
} from '../types';

const FoodOrderState = props => {
    const initialState = {
        foodOrders: null,
        error: null
    };

    const [state, dispatch] = useReducer(foodOrderReducer, initialState);

    // Get All Food orders
    const getFoodOrders = async () => {
        try {
            const res = await axios.get('/api/food-order');

            dispatch({
                type: GET_FOODORDERS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FOODORDER_ERROR,
                payload: err.response
            });
        }
    }

    // Add Food order
    const addOrder = async (foodOrder) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/food-order', foodOrder, config);

            dispatch({
                type: ADD_FOODORDER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FOODORDER_ERROR,
                payload: err.response.msg
            });
        }
    }

    // Cancel food order
    const cancelOrder = async (id) => {
        try {
            await axios.delete(`/api/food-order/${id}`);
            
            dispatch({ 
                type: CANCEL_FOODORDER, 
                payload: id 
            });
        } catch (err) {
            dispatch({
                type: FOODORDER_ERROR,
                payload: err.response.msg
            });
        }
    }

    // Clear food orders after logout
    const clearOrders = () => {
        dispatch({
            type: CLEAR_FOODORDERS
        })
    }

    return (
        <FoodOrderContext.Provider value={{
            foodOrders: state.foodOrders,
            error: state.error,
            addOrder,
            cancelOrder,
            getFoodOrders,
            clearOrders
        }}>
            {props.children}
        </FoodOrderContext.Provider>
    )

}

export default FoodOrderState;