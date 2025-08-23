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
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import

const router = createBrowserRouter([
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
      <ProtectedRoute role="vendor">
        <Layout>
          <ViewMyProducts />
        </Layout>
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/add-product",
    element: (
      <ProtectedRoute role="vendor">
        <Layout>
          <AddProduct />
        </Layout>
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },

  // ✅ Catch-all route (must be last)
  { path: "*", element: <NotFound /> },
]);

export default router;
