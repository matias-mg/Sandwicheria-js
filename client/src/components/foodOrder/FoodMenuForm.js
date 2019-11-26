import React, { useState, useContext, useEffect } from 'react';
import FoodMenuContext from '../../context/foodmenu/foodMenuContext';
import AlertContext from '../../context/alert/alertContext';

const FoodMenuForm = () => {
    const foodMenuContext = useContext(FoodMenuContext);
    const alertContext = useContext(AlertContext);
    const { current, addFoodMenu, updateFoodMenu, clearCurrent } = foodMenuContext;

    useEffect(() => {
        if(current !== null) {
            setFoodMenu(current);
        } else {
            setFoodMenu({
                category: '',
                name: '',
                description: '',
                price: ''
            })
        }
    }, [current, foodMenuContext]);

    const [foodMenu, setFoodMenu] = useState({
        category: '',
        name: '',
        description: '',
        price: ''
    });

    const { name, category, description, price } = foodMenu;

    const onSubmit = e => {
        e.preventDefault();

        if(!name || !category || !description || !price) {
            alertContext.setAlert('Complete todos los campos, por favor.', 'warning');
            return;
        }

        if (current !== null) {
            updateFoodMenu(foodMenu);
        } else {
            addFoodMenu(foodMenu)
        }

        clearAll();
    }

    const onChange = e => {
        setFoodMenu({ ...foodMenu, [e.target.name]: e.target.value });
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit} className="bg-order card">
            <h2 className='text-primary mb-1'>{current ? 'Edit Contact' : 'Añadir promoción'}</h2>
            <h4>Tipo de promoción</h4>
            <input type='radio' name='category' value='Sushi' checked={category === 'Sushi'} onChange={onChange}/>{' '} Sushi{' '}
            <input type='radio' name='category' value='Completo' checked={category === 'Completo'} onChange={onChange} />{' '} Completo{' '}
            <input type='radio' name='category' value='Sandwich' checked={category === 'Sandwich'} onChange={onChange} />{' '} Sandwich
            <input type='text' placeholder='Nombre de promoción' name='name' value={name} onChange={onChange} />
            <textarea type='te' placeholder='Descripción' name='description' value={description} onChange={onChange} />
            <input type='number' placeholder='Precio' name='price' value={price} onChange={onChange} />
            <div>
                <input type='submit' value={current ? 'Actualizar promoción' : 'Añadir promoción'} className='btn btn-primary btn-block btn-form'/>
            </div>
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
                </div>
            )}
        </form>
    );
};

export default FoodMenuForm;
