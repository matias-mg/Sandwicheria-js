import React, { useContext } from 'react';
import { badgeColor, foodCategory } from '../../utilities/functions';
import PropTypes from 'prop-types';
import sushi from '../img/sushi-img.jpg'
import sandwich from '../img/sandwich-img.jpg'
import completo from '../img/completo-img.jpg'
import FoodOrderContext from '../../context/foodorder/foodOrderContext';
import FoodMenuContext from '../../context/foodmenu/foodMenuContext';
import AuthContext from '../../context/auth/authContext';

const FoodMenuItem = ({ foodMenu }) => {
    const imageFood = (category) => {
        switch (category) {
            case 'Sushi':
                return <img src={sushi} className="hide-sm" alt={category} />
            case 'Completo':
                return <img src={completo} className="hide-sm" alt={category} />
            case 'Sandwich':
                return <img src={sandwich} className="hide-sm" alt={category} />
            default:
                return;
        }
    }

    const { _id, name, category, description, price } = foodMenu;

    const foodOrderContext = useContext(FoodOrderContext);
    const authContext = useContext(AuthContext);
    const foodMenuContext = useContext(FoodMenuContext);

    const { deleteFoodMenu, setCurrent } = foodMenuContext;

    const { user } = authContext;

    const addOrder = () => {
        foodOrderContext.addOrder(foodMenu);
    }

    const deleteOrder = () => {
        deleteFoodMenu(_id);
      };

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
                    <li><p className="price">Precio: <span className="text-success">$ {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span></p></li>
                </ul>
                {user && user.userType === 0 ?
                <div>
                    <button className="btn btn-primary">Ver + detalles</button>
                    <button className="btn btn-secondary" onClick={addOrder} >Ordenar promoción</button>
                </div>
                :
                <div>
                    <button className='btn btn-primary' onClick={() => setCurrent(foodMenu)}>Editar</button>
                    <button className='btn btn-secondary' onClick={deleteOrder}>Eliminar Promoción</button>    
                </div>}
            </div>
            <div>
                {imageFood(category)}
            </div>
        </div>
    )
}

FoodMenuItem.propTypes = {
    foodMenu: PropTypes.object.isRequired
}

export default FoodMenuItem;