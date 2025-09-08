// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170

import { configureStore } from "@reduxjs/toolkit";
import authReducer, { fetchMyAccount, loginUser } from "./redux/authSlice";
import productReducer from "./redux/productSlice";
import shipperReducer from "./redux/shipperSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    shipper: shipperReducer,
  },
});

store.dispatch(fetchMyAccount());

export default store;
