// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import NotFound from '../pages/NotFound';
// import CustomerProfile from '../pages/Customer/CustomerProfile';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <h1>Hello first</h1>,
//     errorElement: <NotFound/>
//   },
//   {
//     path: '/page2',
//     element: <h1>hello from p2</h1>,
//   },
//   {
//     path: '/customerProfile',
//     element: <CustomerProfile/>,
//     errorElement: <NotFound/> 
//   }
// ]);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import Router from "./routes";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />   {/* ✅ Use App so fetchMyAccount runs on reload */}
    </Provider>
  </StrictMode>
);