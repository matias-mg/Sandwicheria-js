import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();

        if (name === '' || email === '') {
            setAlert('Por favor, complete todos los campos', 'danger')
        } else if (password.length < 6) {
            setAlert('Contraseña debe contener 6 carácteres como mínimo', 'danger')
        } else if (password !== password2) {
            setAlert('Las contraseñas no coinciden', 'danger')
        }
        console.log('Register miau');
    }

    return (
        <div className='container-auth bg-order'>
            <h1 className="text-center text-primary">Registro de Usuario</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirme contraseña:</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} />
                </div>
                <input type="submit" value="Crear usuario" className="btn btn-success btn-block btn-form" />
            </form>
        </div>
    )
}

export default Register
