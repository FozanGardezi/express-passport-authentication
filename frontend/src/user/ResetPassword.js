import React, {useState} from 'react';
import Layout from '../core/Layout';
import {useParams} from "react-router";
import {resetPassword} from '../auth/index';


const ResetPassword = () => {

    let {id,token} =  useParams();

    const [data, setData] = useState({
        password: '',
        success: ''
    });

    const {password, success} = data;

    const submitForm = () => {
        return (
            <form>
                <div>
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange('password')} type="text" size="sm" className="form-control" value={password}></input>
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
        resetPassword({"password":password, "id":id, "token":token})
        .then(response => {
            console.log("Error if any:",response);
            if(response.success){
                setData({...data, success:true})
            }else{
                setData({...data, success:false})
            }
        })

    }

    const passwordSuccesfullyChanged = () => {
        return(
            <div className="alert alert-info" style={{display: success ? '': 'none'}}>
                Password succesfully changed
            </div>
        )
    }


    return(
        <Layout title="Forgot Password" description="Enter email to reset password">
            {passwordSuccesfullyChanged()}
            {submitForm()}
        </Layout>
        
    )
}

export default ResetPassword;