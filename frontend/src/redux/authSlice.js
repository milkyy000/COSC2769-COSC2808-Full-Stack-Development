// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Tran Huu Viet Hung
// ID: s3975170
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register API
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Register failed");
    }
  }
);

// 🔹 Login API
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Login failed");
    }
  }
);

// 🔹 My Account API
export const fetchMyAccount = createAsyncThunk(
  "auth/myAccount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/myAccount", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to fetch account");
    }
  }
);

// 🔹 Persisted state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  initialized: false,
  successMsg: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // clear persisted user
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMsg = action.payload.msg;
        state.initialized = true;
        // persist register
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMsg = action.payload.msg;

        // 🔹 persist login
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Fetch My Account
      .addCase(fetchMyAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(fetchMyAccount.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.initialized = true;
        state.error = action.payload || "Failed to fetch account";
      });
  },
  selectors: {
    user: (state) => state.user,
    loading: (state) => state.loading,
    initialized: (state) => state.initialized,
    error: (state) => state.error,
  },
});

export const { logoutSuccess } = authSlice.actions;
export const authSelect = authSlice.selectors;
export default authSlice.reducer;
