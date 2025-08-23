import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import CustomerProfile from '../pages/Customer/CustomerProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello first</h1>,
    errorElement: <NotFound/>
  },
  {
    path: '/page2',
    element: <h1>hello from p2</h1>,
  },
  {
    path: '/customerProfile',
    element: <CustomerProfile/>,
    errorElement: <NotFound/> 
  }
]);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
