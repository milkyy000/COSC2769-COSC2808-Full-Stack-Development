// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login API
export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const res = await axios.post("http://localhost:5000/api/auth/login", data, {
    withCredentials: true,
  });
  return res.data;
});

// My Account API
export const fetchMyAccount = createAsyncThunk("auth/myAccount", async () => {
  const res = await axios.get("http://localhost:5000/api/auth/myAccount", {
    withCredentials: true,
  });
  return res.data;
});

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // persist login
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null, initialized: false },
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMsg = action.payload.msg;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchMyAccount
      .addCase(fetchMyAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true; // ✅ finished session check
      })
      .addCase(fetchMyAccount.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.initialized = true; // ✅ still mark as finished
      });
  },
  selectors: {
    user: (state) => state.user,
    loading: (state) => state.loading,
    initialized: (state) => state.initialized,
  },
});

export const { logoutSuccess } = authSlice.actions;
export const authSelect = authSlice.selectors;
export default authSlice.reducer;
