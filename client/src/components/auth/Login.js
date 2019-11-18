import React, { useState } from 'react'

const Login = () => {
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
        console.log('Login miau');
    }

    return (
        <div className='container-auth bg-order'>
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
        </div>
    )
}

export default Login
