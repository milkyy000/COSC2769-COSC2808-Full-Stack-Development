import { configureStore } from "@reduxjs/toolkit";
import authReducer, { fetchMyAccount, loginUser } from "./redux/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.dispatch(fetchMyAccount());

export default store;
