import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { badgeColor, foodCategory } from '../../utilities/functions';
import PropTypes from 'prop-types';
import sushi from '../img/sushi-img.jpg'
import FoodOrderContext from '../../context/foodorder/foodOrderContext';

function FoodMenuItem({ foodMenu }) {
    const { name, category, description, price } = foodMenu;

    const foodOrderContext = useContext(FoodOrderContext);

    const addOrder = () => {
        foodOrderContext.addOrder(foodMenu);
    }

    return (
        <div className="card bg-menu">
            <div>
                <span className={'badge ' + badgeColor(category)}>
                    <i className={foodCategory(category)}></i> <span>{category}</span>
                </span>
                <h3 className="text-primary text-left">{name}</h3>
                <ul className="list">
                    <li>
                        <p className="text-gray">{description}</p>
                    </li>
                    <li><p className="price">$ {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</p></li>
                </ul>
                <Link to="/register"><button className="btn btn-primary">Ver + detalles</button></Link>
                <button className="btn btn-secondary" onClick={addOrder} >Ordenar promoción</button>
            </div>
            <div>
                <img src={sushi} alt="" />
            </div>
        </div>
    )
}

FoodMenuItem.propTypes = {
    foodMenu: PropTypes.object.isRequired
}

export default FoodMenuItem;