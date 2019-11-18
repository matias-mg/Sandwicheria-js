import React from 'react';
import FoodMenus from '../foodMenu/FoodMenus';
import FoodOrders from '../foodMenu/client/FoodOrders';

function Home() {
    return (
        <div className="grid-2 mt-1">
            <div>
                <FoodMenus />
            </div>
            <div>
                <FoodOrders />
            </div>
        </div>
    )
}

export default Home
