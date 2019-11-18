import React from 'react';
import spinner from '../img/spinner.gif';

const Spinner = () => {
    return (
        <React.Fragment>
            <img
                src={spinner}
                style={{ width: '200px', height: '200px', margin: 'auto', display: 'block' }}
                alt='Cargando...'
            >
            </img>
        </React.Fragment>
    )
}

export default Spinner
