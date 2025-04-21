import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../global/globalSlice";

// Constants
const API_BASE_URL = "http://localhost:8087/api/v1";
const POSTS_API = `${API_BASE_URL}/posts`;

// Initial State
const initialState = {
  loading: false,
  success: false,
  posts: [],
  post: null,
  error: null,
};

// Async Thunks
export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${POSTS_API}/public-posts`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const addPostAction = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(POSTS_API, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const fetchSinglePostAction = createAsyncThunk(
  "post/fetch-single-post",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${POSTS_API}/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/fetch-private-posts",
  async (
    { page = 1, limit = 2, searchTerm = "" },
    { rejectWithValue, getState }
  ) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${POSTS_API}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "post/delete-post",
  async (postId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(`${POSTS_API}/${postId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const updatePostAction = createAsyncThunk(
  "post/update",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${POSTS_API}/${payload?.postId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const likePostAction = createAsyncThunk(
  "post/like",
  async (postId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${POSTS_API}/likes/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const dislikePostAction = createAsyncThunk(
  "post/dislike",
  async (postId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${POSTS_API}/dislikes/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const clapPostAction = createAsyncThunk(
  "post/clap",
  async (postId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${POSTS_API}/claps/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const viewPostCountAction = createAsyncThunk(
  "post/post-views",
  async (postId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${POSTS_API}/${postId}/post-view-count`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    // Fetch Public Posts
    builder.addCase(fetchPublicPostsAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.posts = null;
      state.loading = false;
    });

    // Add Post
    builder.addCase(addPostAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.post = null;
      state.loading = false;
    });

    // Fetch Single Post
    builder.addCase(fetchSinglePostAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(fetchSinglePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchSinglePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.post = null;
      state.loading = false;
    });

    // Fetch Private Posts
    builder.addCase(fetchPrivatePostsAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.posts = null;
      state.loading = false;
    });

    // Delete Post
    builder.addCase(deletePostAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.post = null;
    });
    builder.addCase(deletePostAction.fulfilled, (state) => {
      state.post = null;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.post = null;
      state.loading = false;
      state.success = false;
    });

    // Update Post
    builder.addCase(updatePostAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.post = null;
      state.loading = false;
    });

    // Like Post
    builder.addCase(likePostAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(likePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(likePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.post = null;
      state.loading = false;
    });

    // Dislike Post
    builder.addCase(dislikePostAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(dislikePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(dislikePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.post = null;
      state.loading = false;
    });

    // Clap Post
    builder.addCase(clapPostAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(clapPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(clapPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.post = null;
      state.loading = false;
    });

    // Post View Count
    builder.addCase(viewPostCountAction.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(viewPostCountAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(viewPostCountAction.rejected, (state, action) => {
      state.error = action.payload;
      state.post = null;
      state.loading = false;
    });

    // Reset Success and Error
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const postsReducer = postsSlice.reducer;

export default postsReducer;
