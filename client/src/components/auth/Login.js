import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;

    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Credenciales incorrectas' || error === 'Contraseña incorrecta') {
            setAlert(error, 'danger')
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Por favor, complete todos los campos', 'danger');
        } else {
            login({ email, password });
        }
    }

    return (
        <div className='container-auth bg-order-secondary'>
            <h1 className="text-center text-primary">Inicio de Sesión</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                <input type="submit" value="Iniciar sesión" className="btn btn-success btn-block btn-form" />
            </form>
            <div className="container-auth bg-light">
                <h4 className="mt-1">Tip</h4>
                <p className="text-gray">Tal vez quieras iniciar sesión con permisos de administrador ;).</p>
                <p className="mb-1 text-gray">Si ese es el caso, utiliza admin@gmail.com - "123456"</p>
                <p className="text-secondary">¡Gracias por probar mi Software!</p>
            </div>
        </div>
    )
}

export default Login
