// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Nguyen Bao Toan
// ID: s4045102

import { useSelector } from "react-redux";
import { authSelect } from "../src/redux/authSlice";
import CustomerLayout from "./Customer/CustomerLayout";
import VendorLayout from "./Vendor/VendorLayout";
import ShipperLayout from "./Shipper/ShipperLayout";

export default function RoleBaseLayout({ children }) {
    const user = useSelector(authSelect.user);
    if (!user) {
        return <div>{children}</div>
    }
    switch (user.role) {
        case "customer":
            return <CustomerLayout>{children}</CustomerLayout>
        case "vendor":
            return <VendorLayout>{children}</VendorLayout>
        case "shipper":
            return <ShipperLayout>{children}</ShipperLayout>
        default:
            return <div>{children}</div>;
    }
}