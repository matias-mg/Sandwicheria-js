import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { badgeColor, foodCategory } from '../../../utilities/functions';
import PropTypes from 'prop-types';
import sushi from '../../img/sushi-img.jpg';
import FoodMenuContext from '../../../context/foodmenu/foodMenuContext';

function FoodMenuItem({ foodMenu }) {
  const { _id, name, category, description, price } = foodMenu;

  const foodMenuContext = useContext(FoodMenuContext);

  const deleteOrder = () => {
    foodMenuContext.deleteFoodMenu(_id);
  };

  const addOrder = () => {
    foodMenuContext.addOrder(foodMenu);
  };

  return (
    <div className='card bg-menu'>
      <div>
        <span className={'badge ' + badgeColor(category)}>
          <i className={foodCategory(category)}></i> <span>{category}</span>
        </span>
        <h3 className='text-primary text-left'>{name}</h3>
        <ul className='list'>
          <li>
            <p className='text-gray'>{description}</p>
          </li>
          <li>
            <p className='price'>$ {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}</p>
          </li>
        </ul>
        <Link to='/register'>
          <button className='btn btn-primary'>Editar</button>
        </Link>
        <button className='btn btn-secondary' onClick={deleteOrder}>
          Eliminar
        </button>
      </div>
      <div>
        <img src={sushi} alt='' />
      </div>
    </div>
  );
}

FoodMenuItem.propTypes = {
  foodMenu: PropTypes.object.isRequired
};

export default FoodMenuItem;
