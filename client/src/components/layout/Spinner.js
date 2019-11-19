import React from 'react';
import spinner from '../img/spinner.gif';

const Spinner = () => {
    return (
        <React.Fragment>
            <img
                src={spinner}
                style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}
                alt='Cargando...'
            >
            </img>
        </React.Fragment>
    )
}

export default Spinner
