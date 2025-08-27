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
import Layout from "../components/Vendor/Layout";
import Login from "../pages/Login";
import RegisterCustomer from "../pages/RegisterCustomer";
import RegisterVendor from "../pages/RegisterVendor";
import RegisterShipper from "../pages/RegisterShipper";
import MyAccount from "../pages/MyAccount";
import CustomerProductView from "../pages/Customer/CustomerProductView";
import CustomerProfile from "../pages/Customer/CustomerProfile"

const Router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/registerCustomer", element: <RegisterCustomer /> },
  { path: "/registerVendor", element: <RegisterVendor /> },
  { path: "/registerShipper", element: <RegisterShipper /> },

  {
    path: "/my-account",
    element: (
      <Layout>
        <MyAccount />
      </Layout>
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
      
        <CustomerProductView />
      
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/customerProfile",
    element: (
      
        <CustomerProfile />
      
    ),
    errorElement: <NotFound />,
  },

  // ✅ Catch-all route (must be last)
  { path: "*", element: <NotFound /> },
]);

export default Router;
