import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Signin}/>
                <Route path="/register" component={Signup}/>
                <PrivateRoute path="/" exact component={Home}/>
                <PrivateRoute path="/dashboard" excat component={Dashboard} />
                <Route path="/forgotpassword" excat component={ForgotPassword}/>
                <Route path="/resetpassword/:id/:token" excat component={ResetPassword}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;