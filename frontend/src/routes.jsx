// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

// route.jsx
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import ViewMyProducts from "../pages/Vendor/ViewMyProducts";
import AddProduct from "../pages/Vendor/AddProduct";
import Layout from "../components/Vendor/VendorLayout";
import Login from "../pages/Login";
import RegisterCustomer from "../pages/RegisterCustomer";
import RegisterVendor from "../pages/RegisterVendor";
import RegisterShipper from "../pages/RegisterShipper";
import MyAccount from "../pages/MyAccount";
import CustomerProductView from "../pages/Customer/CustomerProductView";
import CustomerProfile from "../pages/Customer/CustomerProfile"
import CustomerLayout from "../components/Customer/CustomerLayout";
import RoleBaseLayout from "../components/RoleBasedLayout";

const Router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/registerCustomer", element: <RegisterCustomer /> },
  { path: "/registerVendor", element: <RegisterVendor /> },
  { path: "/registerShipper", element: <RegisterShipper /> },

  {
    path: "/my-account",
    element: (
      <RoleBaseLayout>
        <MyAccount />
      </RoleBaseLayout>
    ),
    errorElement: <NotFound />,
  },

  {
    path: "/view-products",
    element: (
     
        <Layout>
          <ViewMyProducts />
        </Layout>
   
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/add-product",
    element: (
      
        <Layout>
          <AddProduct />
        </Layout>
  
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/customerProductView",
    element: (
        <CustomerLayout>
        <CustomerProductView />
        </CustomerLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/customerProfile",
    element: (
      <CustomerLayout>
        <CustomerProfile />
      </CustomerLayout>
    ),
    errorElement: <NotFound />,
  },

  // ✅ Catch-all route (must be last)
  { path: "*", element: <NotFound /> },
]);

export default Router;
