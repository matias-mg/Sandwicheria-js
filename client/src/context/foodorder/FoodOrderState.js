import React, { useReducer } from 'react';
import axios from 'axios';
import FoodOrderContext from './foodOrderContext';
import foodOrderReducer from './foodOrderReducer';
import {
    ADD_FOODORDER,
    CANCEL_FOODORDER,
    FOODORDER_ERROR,
    GET_FOODORDERS,
    CLEAR_FOODORDERS,
    UPDATE_FOODORDER,
    FILTER_FOODORDER,
    CLEAR_FILTER
} from '../types';

const FoodOrderState = props => {
    const initialState = {
        foodOrders: null,
        error: null,
        filtered: null
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

    // Update food order
    const updateFoodOrder = async id => {
        const res = await axios.put(`/api/food-order/${id}`)

        try {
            dispatch({
                type: UPDATE_FOODORDER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FOODORDER_ERROR,
                payload: err.response.data.msg
            })
        }
    };

    // Clear food orders after logout
    const clearOrders = () => {
        dispatch({
            type: CLEAR_FOODORDERS
        })
    }

    // Filter food order
    const filterOrders = (text) => {
        dispatch({
            type: FILTER_FOODORDER,
            payload: text
        })
    }

    // Clear filter food order
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <FoodOrderContext.Provider value={{
            foodOrders: state.foodOrders,
            error: state.error,
            filtered: state.filtered,
            addOrder,
            cancelOrder,
            getFoodOrders,
            clearOrders,
            updateFoodOrder,
            filterOrders,
            clearFilter
        }}>
            {props.children}
        </FoodOrderContext.Provider>
    )

}

export default FoodOrderState;