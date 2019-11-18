import React, { useState } from 'react';

const FoodMenuForm = () => {
    const [foodMenu, setFoodMenu] = useState({
        name: '',
        category: '',
        description: '',
        price: 1
    })

    const { name, category, description, price } = foodMenu;

    return (
        <form>
            <h3>Agregar nueva promoción</h3>
            <input type="text" placeholder="Nombre" name="name" value={name}/>
            <input type="text" placeholder="Nombre" name="name" value={name}/>
            input:
        </form>
    )
}

export default FoodMenuForm
