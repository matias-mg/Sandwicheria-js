import React, { Fragment, useContext } from 'react'
import FoodMenuContext from '../../context/foodmenu/foodMenuContext';
import FoodMenuItem from './FoodMenuItem';

function FoodMenus() {
    const foodMenuContext = useContext(FoodMenuContext);

    return (
        <Fragment>
            <h2>Promociones disponibles</h2>
            {foodMenuContext.foodMenus.map(foodMenu => <FoodMenuItem key={foodMenu.id} foodMenu={foodMenu} />)}
        </Fragment>
    )
}

export default FoodMenus
