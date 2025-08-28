import { useSelector } from "react-redux";
import { authSelect } from "../src/redux/authSlice";
import CustomerLayout from "./Customer/CustomerLayout";
import VendorLayout from "./Vendor/VendorLayout";

export default function RoleBaseLayout({ children }) {
    const user = useSelector(authSelect.user);
    if (!user) {
        return <Layout>{children}</Layout>
    }
    switch (user.role) {
        case "customer":
            return <CustomerLayout>{children}</CustomerLayout>
        case "vendor":
            return <VendorLayout>{children}</VendorLayout>
        case "shipper":
            return <>{children}</>
        default:
            return <Layout>{children}</Layout>;
    }
}