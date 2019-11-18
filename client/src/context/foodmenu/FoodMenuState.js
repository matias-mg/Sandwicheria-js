import React, { useReducer } from 'react';
import uuid from 'uuid';
import FoodMenuContext from './foodMenuContext';
import foodMenuReducer from './foodMenuReducer';
import {
    ADD_FOODMENU,
    DELETE_FOODMENU,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_FOODMENU,
    FILTER_FOODMENU,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const FoodMenuState = props => {
    const initialState = {
        foodMenus: [
            {
                id: 1,
                name: "Promo Sushi",
                category: "Sushi",
                description: "Rico sushi de 40 piezas + bebida de 2 litros.",
                price: 12000
            },
            {
                id: 2,
                name: "Promo Completo",
                category: "Completos",
                description: "Rico completo italiano + bebida de 1 litro.",
                price: 4000
            },
            {
                id: 3,
                name: "Promo Sandwich",
                category: "Sandwich",
                description: "Rico Sandwich a lo pobre + bebida en lata.",
                price: 5000
            }
        ]
    };

    const [state, dispatch] = useReducer(foodMenuReducer, initialState);

    // Add food menu

    // Delete food menu

    // Update food menu

    // Filter food menu

    // Clear filter

    // Set current

    // Clear current 

    return (
        <FoodMenuContext.Provider value={{
            foodMenus: state.foodMenus
        }}>
            {props.children}
        </FoodMenuContext.Provider>
    )
}

export default FoodMenuState;