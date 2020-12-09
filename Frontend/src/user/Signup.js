import React, {useState} from 'react';
import {signup} from '../auth';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';

const Signup = () => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        hashed_password: '',
        error: '',
        success: false
    });

    const {firstName, lastName, email, hashed_password, success, error} = values;

    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    }

    

    const clickSubmit = event => {
        // prevent the page from reloading on submitting
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({firstName, lastName, email, hashed_password})
        .then((data) => {
            //console.log("data before entering: ",data);
            if(data.status === "error"){
                setValues({...values, error: data.message, success: false});
            }else if (data.success === false){
                setValues({...values, error: data.msg, success: false});
            }else {
                setValues({...values, firstName:'', lastName:'', email:'', hashed_password:'', error:'', success:true});   
            }
        })
        .catch(err => {
            console.log("submission error: ", err);
        })
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">First Name</label>
                <input onChange={handleChange('firstName')} type="text" className="form-control" value={firstName}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input onChange={handleChange('lastName')} type="text" className="form-control" value={lastName}/>
            </div>

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

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
                {error}
            </div>
        );
    }

    const showSuccess = () => {
        return(
            <div className="alert alert-info" style={{display: success ? '': 'none'}}>
                New account is registered<Link to="/signin">Signin</Link>
            </div>
        );
    }

    return(
        <Layout title="Signup" description="" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>
    )   
}

export default Signup;