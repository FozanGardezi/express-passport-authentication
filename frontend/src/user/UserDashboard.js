import React from "react";
import Layout from "../core/Layout"; 
import {Link} from 'react-router-dom';
import {isAuthenticated} from "../auth";

const Dashboard = () => {

    const {_id, firstName, email} = isAuthenticated()

    const userLinks = () => {
        return (
            <div class="card">
                <h4 className="list-group"> User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>

                    <li className="list-group-item">
                        <Link className=""nav-link to="/profile/update">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{_id}</li>
                    <li className="list-group-item">{firstName}</li>
                    <li className="list-group-item">{email}</li>
                </ul>
            </div>
        );
    }

    const purchaseHistory = () => {
        return(
            <div className="card">
                <h3 className="card-header">Purchase History</h3>
                <ul className="list-group">
                    <li className="list-group-item">history</li>
                </ul>
            </div>
        );
    }

    return (
        <Layout title= "Dashboard" description={`G'day ${firstName}`} className="container">         
            <div className="row">
                <div classNmae="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
            
        </Layout>
    )
}

export default Dashboard;