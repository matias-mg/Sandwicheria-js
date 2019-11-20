import {
    ADD_FOODORDER,
    CANCEL_FOODORDER,
    FOODORDER_ERROR,
    GET_FOODORDERS,
    CLEAR_FOODORDERS,
    UPDATE_FOODORDER
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_FOODORDERS:
            return {
                ...state,
                foodOrders: action.payload,
                loading: false
            }
        case ADD_FOODORDER:
            return {
                ...state,
                foodOrders: [action.payload, ...state.foodOrders],
                loading: false
            }
        case CANCEL_FOODORDER:
            return {
                ...state,
                foodOrders: state.foodOrders.filter(order => (order._id !== action.payload)),
                loading: false
            }
        case UPDATE_FOODORDER:
            return {
                ...state,
                foodOrders: state.foodOrders.map(order => 
                    order._id === action.payload._id ? action.payload : order),
                loading: false
            }
        case CLEAR_FOODORDERS:
            return {
                ...state,
                foodOrders: null,
                error: null
            }
        case FOODORDER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}