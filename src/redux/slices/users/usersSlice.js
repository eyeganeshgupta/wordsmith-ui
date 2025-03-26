import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../global/globalSlice";

const API_BASE_URL = "http://localhost:8087/api/v1";
const USERS_API = `${API_BASE_URL}/users`;

const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  user: null,
  users: [],
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

// ! Async thunk action for user login
export const loginAction = createAsyncThunk(
  "users/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${USERS_API}/login`, credentials);

      // * Saving the user into localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const logoutAction = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("userInfo");
  return true;
});

// ! Async thunk action for user registration
export const registerAction = createAsyncThunk(
  "users/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${USERS_API}/register`, credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const userPublicProfileAction = createAsyncThunk(
  "users/user-public-profile",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${USERS_API}/public-profile/${userId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const userPrivateProfileAction = createAsyncThunk(
  "users/user-private-profile",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${USERS_API}/profile/`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Users slice with reducers for handling actions
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.userAuth.userInfo = null;
      state.loading = false;
    });

    builder.addCase(registerAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(registerAction.rejected, (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.loading = false;
    });

    builder.addCase(userPublicProfileAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userPublicProfileAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(userPublicProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(userPrivateProfileAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userPrivateProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(userPrivateProfileAction.rejected, (state, action) => {
      state.error = action.payload;
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

const usersReducer = usersSlice.reducer;

export default usersReducer;
