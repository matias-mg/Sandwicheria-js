import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container-nav">
                <h1><i className="fas fa-utensils"></i> Sandwichería JS</h1>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/about">Ubicación</Link></li>
                    <li><Link to="/register">Registro</Link></li>
                    <li><Link to="/login">Iniciar sesión</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
