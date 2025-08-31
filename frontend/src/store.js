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
