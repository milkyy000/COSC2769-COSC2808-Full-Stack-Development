import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Get all products API
export const fetchProducts = createAsyncThunk(
    'products/getAllProducts',
    async(_, {rejectWithValue }) => {
        try {
            console.log("running productSlice.js");
            const res = await axios.get("http://localhost:5000/api/products/getAllProducts",  {
        withCredentials: true,
        });
            console.log("productslice.js: " + res.data)
            return res.data;

        }  catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to fetch products");
    }
    }
)

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // store products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
})

export default productSlice.reducer;
