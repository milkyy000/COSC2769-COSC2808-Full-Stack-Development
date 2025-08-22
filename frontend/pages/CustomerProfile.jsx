import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomerProfile() {
    return (
        <>
        <Link to='/customerProfile'>goto customer</Link>
        <h1>Customer main</h1>
        <div className="navbar">
            <div>AppName</div>
            <nav></nav>
        </div>
        <div className="sideNav">
            <div className="d-flex">
                
                <img src="/images/person.png" alt="profile picture" className="rounded-circle border border-3"/>
                <div>
                <p>Person name</p>
                <Link>Edit profile</Link>
                </div>
            </div>
        </div>
        </>
    )
}