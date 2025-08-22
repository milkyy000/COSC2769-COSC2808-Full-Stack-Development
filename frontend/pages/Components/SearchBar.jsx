import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';

export default function SearchBar() {
    return (
        <>
        <div className="search-bar-container w-100 bg-success px-5 py-3 d-flex flex-row ">
            <div className="logo-container d-flex justify-content-center p-1">
                <img src="images/cart.png" alt="Logo" />
                <strong className="align-content-center"><h1>Logo</h1></strong>
            </div>
            <div className="input align-content-center w-50 ms-5">
                <form action="">
                    <div class="input-group mb-3">
                    <input type="text" class="form-control" />
                    <button type="submit" className="btn bg-primary m-1"><img src="\images\magnifying-glass.png" id="findButton" alt="Find" /></button>
                    </div>
                </form>
            </div>
            <div className="ms-auto">
                <Link ><button className="btn"><img src="images/cart.png" alt="Logo" /></button></Link>
            </div>
        </div>
        </>
    )
};