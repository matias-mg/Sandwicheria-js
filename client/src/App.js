import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import FoodMenusPanel from './components/pages/FoodMenusPanel';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import FoodMenuState from './context/foodmenu/FoodMenuState';
import FoodOrderState from './context/foodorder/FoodOrderState'
import AuthState from './context/auth/authState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utilities/setAuthToken';

import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <FoodMenuState>
        <FoodOrderState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className="container">
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/administrar" component={FoodMenusPanel} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </FoodOrderState>
      </FoodMenuState>
    </AuthState>
  );
}

export default App;
