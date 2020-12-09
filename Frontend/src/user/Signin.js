import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth';
import Layout from '../core/Layout';


// Function component of Signin 
const Signin = () => {
    // using hooks for states in this component
    const [values, setValues] = useState({
        email: '',
        hashed_password: '',
        error: "",
        loading: false, 
        redirectToReferrer: false,
    });

    // destructuring the vales
    const {email, hashed_password, loading, error, redirectToReferrer} = values;

    // function recieving a string which is the state in the component and the event
    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    }

    

    const clickSubmit = event => {
        // prevent the page from reloading on submitting
        event.preventDefault();

        setValues({ ...values, error: false, loading: true });

        //signing in with the recieved credentials
        signin({email, hashed_password})
        .then((data) => {
            if(!data.success){
                return setValues({...values, error: data.msg, loading: false});
            }else{
                authenticate(data, ()=> {
                    setValues({...values, redirectToReferrer:true});    
                })
                
            }
        })  
    }

    const signInForm = () => (
        <form>
            <div>
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>
            <div>
                <label className="text-muted">Password</label>
                <input onChange={handleChange('hashed_password')} type="password" className="form-control" value={hashed_password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    // if there is any string in the state display the error
    const showError = () => {
        return (
            <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
                {error}
            </div>
        );
    }

    const showLoading = () => {
        loading &&  (<div className="alert alert-info"><h2>Loading...</h2></div>)
    }

    const redirectUser = () => {
        if(redirectToReferrer){
            return <Redirect to='/' />
        }
    }

    return(
        <Layout title="Signin" description="" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
            {JSON.stringify(values)}
        </Layout>
    );   
}

export default Signin;