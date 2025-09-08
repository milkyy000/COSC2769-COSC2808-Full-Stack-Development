// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Quy Duc
// ID: s4070049

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
import CustomerProductDetail from "../pages/Customer/CustomerProductDetail";
import OrderView from "../pages/Customer/OrderView";
import CustomerLayout from "../components/Customer/CustomerLayout";
import RoleBaseLayout from "../components/RoleBasedLayout";
import ShoppingCartView from "../pages/Customer/ShoppingCartView";
import ShipOrders from "../pages/Shipper/ShipOrders";
import OrderDetail from "../pages/Shipper/OrderDetails";
import About from "../components/FooterPages/About";
import Privacy from "../components/FooterPages/Privacy";
import Help from "../components/FooterPages/Help";
import Feedback from "../components/FooterPages/Feedback";
import RequireAuth from "./RequireAuth";
const Router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/registerCustomer", element: <RegisterCustomer /> },
  { path: "/registerVendor", element: <RegisterVendor /> },
  { path: "/registerShipper", element: <RegisterShipper /> },

  {
    path: "/my-account",
    element: (
      <RequireAuth>
        <RoleBaseLayout>
          <MyAccount />
        </RoleBaseLayout>
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },

  {
    path: "/view-products",
    element: (
      <RequireAuth>
        <Layout>
          <ViewMyProducts />
        </Layout>
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/add-product",
    element: (
      <RequireAuth>
        <Layout>
          <AddProduct />
        </Layout>
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/customerProductView",
    element: (
      <RequireAuth>
        <CustomerLayout>
          <CustomerProductView />
        </CustomerLayout>
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/customerProductDetail/:id",
    element: (
      <RequireAuth>
        <CustomerLayout>
          <CustomerProductDetail />
        </CustomerLayout>
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/shopping-cart",
    element: (
      <RequireAuth>
        <CustomerLayout>
          <ShoppingCartView />
        </CustomerLayout>
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/order-view",
    element: (
      <RequireAuth>
        <CustomerLayout>
          <OrderView />
        </CustomerLayout>
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/shipper/orders",
    element: (
      <RequireAuth>
        <RoleBaseLayout>
          <ShipOrders />
        </RoleBaseLayout>
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/shipper/orders/:id",
    element: (
      <RequireAuth>
        <RoleBaseLayout>
          <OrderDetail />
        </RoleBaseLayout>
      </RequireAuth>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/about",
    element: (
      <RoleBaseLayout>
        <About />
      </RoleBaseLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/privacy",
    element: (
      <RoleBaseLayout>
        <Privacy />
      </RoleBaseLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/help",
    element: (
      <RoleBaseLayout>
        <Help />
      </RoleBaseLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/feedback",
    element: (
      <RoleBaseLayout>
        <Feedback />
      </RoleBaseLayout>
    ),
    errorElement: <NotFound />,
  },
  // ✅ Catch-all route (must be last)
  { path: "*", element: <NotFound /> },
]);

export default Router;
