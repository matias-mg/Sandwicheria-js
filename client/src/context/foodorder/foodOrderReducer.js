import { ADD_FOODORDER, CANCEL_FOODORDER } from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_FOODORDER:
            return {
                ...state, 
                foodOrders: [...state.foodOrders, action.payload]
            }
        case CANCEL_FOODORDER:
            return {
                ...state,
                foodOrders: state.foodOrders.filter(order => (order.id != action.payload))
            }
        default:
            return state;    
    }
}