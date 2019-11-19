import React, { useReducer } from 'react';
import axios from 'axios';
import FoodMenuContext from './foodMenuContext';
import foodMenuReducer from './foodMenuReducer';
import {
  ADD_FOODMENU,
  DELETE_FOODMENU,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_FOODMENU,
  GET_FOODMENUS,
  FOODMENU_ERROR
} from '../types';

const FoodMenuState = props => {
  const initialState = {
    foodMenus: [
    //   {
    //     _id: 1,
    //     name: 'Promo Sushi',
    //     category: 'Sushi',
    //     description: 'Rico sushi de 40 piezas + bebida de 2 litros.',
    //     price: 12000
    //   },
    //   {
    //     _id: 2,
    //     name: 'Promo Completo',
    //     category: 'Completos',
    //     description: 'Rico completo italiano + bebida de 1 litro.',
    //     price: 4000
    //   },
    //   {
    //     _id: 3,
    //     name: 'Promo Sandwich',
    //     category: 'Sandwich',
    //     description: 'Rico Sandwich a lo pobre + bebida en lata.',
    //     price: 5000
    //   }
    ],
    current: null,
    error: null
  };

  const [state, dispatch] = useReducer(foodMenuReducer, initialState);

  // Get all food menus
  const getFoodMenus = async () => {
    try {
      const res = await axios.get('/api/food-menu');

      dispatch({
        type: GET_FOODMENUS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FOODMENU_ERROR,
        payload: err.response
      });
    }
  };

  // Add food menu
  const addFoodMenu = async menu => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/food-menu', menu, config);

      dispatch({
        type: ADD_FOODMENU,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FOODMENU_ERROR,
        payload: err.response
      });
    }
  };

  // Delete food menu
  const deleteFoodMenu = async id => {
    try {
      await axios.delete(`/api/food-menu/${id}`);

      dispatch({
        type: DELETE_FOODMENU,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: FOODMENU_ERROR,
        payload: err.response
      });
    }
  };

  // Update food menu
  const updateFoodMenu = async menu => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/food-menu/${menu._id}`, menu, config);

      dispatch({
        type: UPDATE_FOODMENU,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FOODMENU_ERROR,
        payload: err.response
      });
    }
  };

  // @todo Filter menus

  // Set current
  const setCurrent = menu => {
    dispatch({ type: SET_CURRENT, payload: menu });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <FoodMenuContext.Provider
      value={{
        foodMenus: state.foodMenus,
        current: state.current,
        error: state.error,
        getFoodMenus,
        addFoodMenu,
        deleteFoodMenu,
        updateFoodMenu,
        setCurrent,
        clearCurrent
      }}>
      {props.children}
    </FoodMenuContext.Provider>
  );
};

export default FoodMenuState;
