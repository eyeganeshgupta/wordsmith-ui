import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../global/globalSlice";

const API_BASE_URL = "http://localhost:8087/api/v1";
const POSTS_API = `${API_BASE_URL}/posts`;

const INITIAL_STATE = {
  loading: false,
  success: false,
  posts: [],
  post: null,
  error: null,
};

export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${POSTS_API}/public`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchPublicPostsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.userAuth.userInfo = null;
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

const postsReducer = postsSlice.reducer;

export default postsReducer;
