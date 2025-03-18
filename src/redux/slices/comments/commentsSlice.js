import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../global/globalSlice";

// Constants
const API_BASE_URL = "http://localhost:8087/api/v1";
const COMMENT_API = `${API_BASE_URL}/comments`;

// Initial State
const initialState = {
  loading: false,
  success: false,
  comments: [],
  comment: null,
  error: null,
};

// Thunk: Create Comment Action
export const createComment = createAsyncThunk(
  "comments/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${COMMENT_API}/${payload?.postId}`,
        { message: payload?.message },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

// Slice: Comment
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.comment = null;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comment = action.payload;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const commentReducer = commentSlice.reducer;

export default commentReducer;
