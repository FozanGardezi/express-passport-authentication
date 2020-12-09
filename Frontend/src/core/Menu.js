import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated, signout} from '../auth';

const isActive = (history, path) => {
    if(history.location.pathame === path){
        return {color:'#ff9900'}
    }else{
        return {color: '#ffffff'}
    }
}

const Menu = ({ history }) => {
    return(
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/dashboard')} to="/dashboard">Dashboard</Link>
                </li>
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/register')} to="/register">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/login') }to="/login">Signin</Link>
                        </li>
                    </Fragment>
                    
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signout(() => {
                            history.push('/')
                        })}>Signout</span>
                    </li>                                        
                )}
            </ul>
        </div>
    ); 
}

export default withRouter(Menu);