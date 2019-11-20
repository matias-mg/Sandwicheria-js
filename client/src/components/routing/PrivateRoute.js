import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { isAuthenticated, loading } = authContext;

    if(!isAuthenticated && !loading) alertContext.setAlert('Necesita iniciar sesión para acceder al menú principal', 'danger');

    return (
        <Route { ...rest } render={props => !isAuthenticated && !loading ? 
            <Redirect to="/login" />
            :
            <Component {...props} /> }
        />
    )
}

export default PrivateRoute
