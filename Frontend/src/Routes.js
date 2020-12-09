import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Signin}/>
                <Route path="/register" component={Signup}/>
                <PrivateRoute path="/" exact component={Home}/>
                <Route path="/dashboard" excat component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;