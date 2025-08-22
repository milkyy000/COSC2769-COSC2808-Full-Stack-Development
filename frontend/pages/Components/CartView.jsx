import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CartView(){
    return (
        <>
        <div className="w-75 me-3">
            <div className="d-flex flex-row">
                <div className="">Products</div>
                <div>Single cost</div>
                <div>Ammount</div>
                <div>Total cost</div>
                <div>Actions</div>
            </div>
        </div>
        </>
    )
}