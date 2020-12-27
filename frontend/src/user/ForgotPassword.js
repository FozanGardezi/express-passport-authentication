import React, {useState} from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import {forgotPasswordEmail} from '../auth/index';


const ForgotPassword = () => {

    const [data, setData] = useState({
        email: '',
        success: '',
        error: ''
    });

    const {email,success, error} = data;

    const submitForm = () => {
        return (
            <form>
                <div>
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} type="text" size="sm" className="form-control" value={email}></input>
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">Button</button>
            </form>
            
        )
    }

    const handleChange = name => event => {
        setData({[name]:event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        forgotPasswordEmail({"email":email})
        .then(response => {
            console.log(response)
            if(response.success){
                setData({...data, success:true})
            }else{
                setData({...data, error:true})
            }
        })

    }

    const showEmailSendingSuccess = () => {
        return(
            <div className="alert alert-info" style={{display: success ? '': 'none'}}>
                Email has been succesfully sent
            </div>
        )
    }

    const failureSendingEmail = () => {
        return(
            <div>
                <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
                    {error}
                </div>
            </div>
        )
    }

    return(
        <Layout title="Forgot Password" description="Enter email to reset password">
            {showEmailSendingSuccess()}
            {submitForm()}
        </Layout>
        
    )
}

export default ForgotPassword;