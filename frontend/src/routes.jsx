// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import ViewMyProducts from "../pages/Vendor/ViewMyProducts";
import AddProduct from "../pages/Vendor/AddProduct";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/view-products" replace />,
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
]);

export default router;
