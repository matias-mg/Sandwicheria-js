import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { badgeColor, foodCategory, statusColor } from '../../../utilities/functions';
import FoodOrderContext from '../../../context/foodorder/foodOrderContext';
import PropTypes from 'prop-types';

function FoodOrderItem({ foodOrder }) {
    const { id, name, category, description, price, status, orderDetails } = foodOrder;

    const foodOrderContext = useContext(FoodOrderContext);

    const cancelOrder = () => {
        foodOrderContext.cancelOrder(id);
    }
    return (
        <div className="card bg-order">
            <span className={'badge ' + badgeColor(category)}>
                <i className={foodCategory(category)}></i> <span>{category}</span>
            </span>
            <h3 className="text-primary text-left">{name}</h3>
            <ul className="list">
                <li>
                    <p className="text-gray">{description}</p>
                </li>
                <li>
                    <p className="price">Total: $ {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</p>
                </li>
                <li>
                    <p className="text-primary">
                        Estado: <span className={statusColor(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </p>
                </li>
                {orderDetails && (<li>
                    <p className="text-primary">
                        Detalles: <span className="badge badge-details badge-light-gray">{orderDetails}</span>
                    </p>
                </li>)}
            </ul>
            <button className="btn btn-danger" onClick={cancelOrder}>Cancelar pedido</button>
        </div>
    )
}

FoodOrderItem.propTypes = {
    foodOrder: PropTypes.object.isRequired
}

export default FoodOrderItem;