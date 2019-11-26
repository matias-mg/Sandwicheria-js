import React, { useContext, useRef, useEffect } from 'react';
import FoodOrderContext from '../../context/foodorder/foodOrderContext';

const FoodOrderFilter = () => {
    const foodOrderContext = useContext(FoodOrderContext);
    const text = useRef('')

    useEffect(() => {
        if (foodOrderContext.filtered === null) {
            text.current.value = ''
        }
    }, [])

    const onChange = e => {
        if (text.current.value !== '') {
            foodOrderContext.filterOrders(e.target.value);
        } else {
            foodOrderContext.clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filtrar Ordenes..." onChange={onChange} />
        </form>
    )
}

export default FoodOrderFilter
