// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Pham Chau Tan Dat
// ID: s4069488

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShipperOrders = createAsyncThunk(
  "shipper/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/shipper/orders", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to fetch orders");
    }
  }
);

export const fetchShipperOrderById = createAsyncThunk(
  "shipper/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/shipper/orders/${orderId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to fetch order");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "shipper/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/shipper/orders/${orderId}/status`,
        { status },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to update order");
    }
  }
);

const shipperSlice = createSlice({
  name: "shipper",
  initialState: {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected(state) {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipperOrders.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchShipperOrders.fulfilled, (s, a) => { s.loading = false; s.orders = a.payload; })
      .addCase(fetchShipperOrders.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchShipperOrderById.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchShipperOrderById.fulfilled, (s, a) => { s.loading = false; s.selectedOrder = a.payload; })
      .addCase(fetchShipperOrderById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(updateOrderStatus.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(updateOrderStatus.fulfilled, (s, a) => {
        s.loading = false;
        // remove updated order from list (since only active orders are shown)
        s.orders = s.orders.filter((o) => o._id !== a.payload._id);
        s.selectedOrder = a.payload;
      })
      .addCase(updateOrderStatus.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { clearSelected } = shipperSlice.actions;
export default shipperSlice.reducer;