import { configureStore } from "@reduxjs/toolkit";
import authReducer, { fetchMyAccount, loginUser } from "./redux/authSlice";
import productReducer from "./redux/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

store.dispatch(fetchMyAccount());

export default store;
