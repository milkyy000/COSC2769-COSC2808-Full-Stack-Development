

import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from "../Components/SearchBar";
import CartView from "../Components/CartView";

export default function CustomerProfile() {
    return (
        <>
        <SearchBar />
        
        <div className="profile d-flex mt-3">
            <div className="d-flex flex-column">
                <div className="d-flex mx-3">
                <img src="/images/person.png" alt="profile picture" className="rounded-circle border border-3"/>
                <div className="align-content-center mx-2">
                Person name
                </div>
            </div>
            <div className="sideNav d-flex flex-column mx-3 mt-3">
                <div>
                    <Link>My account</Link>
                </div>
                <div>
                    <Link>My shopping cart</Link>   
                </div>
            </div>
            </div>
            
            <CartView />

        </div>
        </>
    )
}