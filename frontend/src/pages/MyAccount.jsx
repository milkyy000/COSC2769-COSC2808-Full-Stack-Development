// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAccount } from "../redux/authSlice";

export default function MyAccount() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(fetchMyAccount());
    }, [dispatch]);

    if (!user)
        return <p>Loading...</p>
        return (
            <div>
                <h2>My account</h2>
                <p>Role: {user.role}</p>
                <p>Username: {user.username}</p>
                {user.name && <p>Name: {user.name}</p>}
                {user.address && <p>Address: {user.address}</p>}
                {user.businessName && <p>Business: {user.businessName}</p>}
                {user.distributionHub && <p>Hub: {user.distributionHub}</p>}
            </div>
        );
}