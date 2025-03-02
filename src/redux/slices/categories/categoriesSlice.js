import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../global/globalSlice";

const API_BASE_URL = "http://localhost:8087/api/v1";
const CATEGORIES_API = `${API_BASE_URL}/categories`;

const INITIAL_STATE = {
  loading: false,
  error: null,
  categories: [],
  category: null,
  success: false,
};

export const fetchAllCategoriesAction = createAsyncThunk(
  "categories/fetch-all-categories",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CATEGORIES_API);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategoriesAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAllCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchAllCategoriesAction.rejected, (state, action) => {
      state.error = action.payload;
      state.categories = null;
      state.loading = false;
    });

    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });

    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });
  },
});

const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;
