import React, { Fragment, useContext } from 'react';
import { badgeColor, foodCategory, statusColor } from '../../utilities/functions';
import FoodOrderContext from '../../context/foodorder/foodOrderContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import PropTypes from 'prop-types';

function FoodOrderItem({ foodOrder }) {
    const { _id, name, userName, category, description, price, status } = foodOrder;

    const foodOrderContext = useContext(FoodOrderContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { user } = authContext;
    const { updateFoodOrder, cancelOrder } = foodOrderContext;

    const cancelOrderCheck = () => {
        if (status !== "en espera") {
            alertContext.setAlert("No puedes cancelar un pedido en preparación o ya finalizado.", "warning");
        } else {
            cancelOrder(_id);
        }
    }
    return (
        <div className="card bg-order-secondary">
            <span className={'badge ' + badgeColor(category)}>
                <i className={foodCategory(category)}></i> <span>{category}</span>
            </span>
            <h3 className="text-primary text-left">{name}</h3>
            <ul className="list">
                <li>
                    <p className="text-gray">{description}</p>
                </li>
                {user && user.userType === 1 && userName &&
                    <li>
                        <h4 className="text-dark">Solicitante: {userName}</h4>
                    </li>
                }
                <span className="text-card text-card-secondary">
                    <li>
                        <p className="text-primary">
                            Estado: <span className={statusColor(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                        </p>
                    </li>
                    <li>
                        <p className="price text-primary">Total: {<span className="text-success"> $ {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}</span>}</p>
                    </li>
                </span>
            </ul>
            {user && user.userType === 0 ?
                foodOrder.status !== 'finalizado' &&
                <div className="text-right">
                    <button className="btn btn-danger center-x" onClick={cancelOrderCheck}>Cancelar pedido</button>
                </div>
                :
                status && status === "en espera" ?
                    <Fragment>
                        <button className="btn btn-success" onClick={() => updateFoodOrder(_id)}>Aceptar pedido</button>
                        <button className="btn btn-danger" onClick={() => cancelOrder(_id)}>Rechazar pedido</button>
                    </Fragment>
                    :
                    status !== 'lista para retirar' && status !== 'finalizado' ?
                    <div className="text-right">
                        <button className="btn btn-secondary" onClick={() => updateFoodOrder(_id)}>Actualizar pedido</button>
                    </div>
                    :
                    status === 'lista para retirar' &&
                    <div className="text-right">
                        <button className="btn btn-danger" onClick={() => updateFoodOrder(_id)}>Finalizar pedido</button>
                    </div>
            }
        </div>
    )
}

FoodOrderItem.propTypes = {
    foodOrder: PropTypes.object.isRequired
}

export default FoodOrderItem;