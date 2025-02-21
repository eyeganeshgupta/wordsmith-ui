import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8087/api/v1";
const USERS_API = `${API_BASE_URL}/users`;

const INITIAL_STATE = {
  loading: false,
  error: null,
  user: null,
  users: [],
  isUpdated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordReset: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: {},
  },
};

export const loginAction = createAsyncThunk(
  "users/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USERS_API}/login`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.userAuth.userInfo = null;
      state.loading = false;
    });
  },
});

const usersReducer = usersSlice.reducer;

export default usersReducer;
