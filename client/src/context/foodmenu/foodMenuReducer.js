import {
  GET_FOODMENUS,
  ADD_FOODMENU,
  UPDATE_FOODMENU,
  DELETE_FOODMENU,
  SET_CURRENT,
  CLEAR_CURRENT,
  FOODMENU_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_FOODMENUS:
      return {
        ...state,
        foodMenus: action.payload,
        loading: false
      };
    case ADD_FOODMENU:
      return {
        ...state,
        foodMenus: [action.payload, ...state.foodMenus],
        loading: false
      };
    case UPDATE_FOODMENU:
      return {
        ...state,
        foodMenus: state.foodMenus.map(foodMenu =>
          foodMenu._id === action.payload._id ? action.payload : foodMenu
        ),
        loading: false
      };
    case DELETE_FOODMENU:
      return {
        ...state,
        foodMenus: state.foodMenus.filter(
          foodMenu => foodMenu._id !== action.payload
        ),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FOODMENU_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};