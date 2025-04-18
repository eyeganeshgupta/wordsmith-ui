import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../global/globalSlice";

// API base URL and endpoints for users
const API_BASE_URL = "http://localhost:8087/api/v1";
const USERS_API = `${API_BASE_URL}/users`;

// Initial state of the users slice
const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  user: null,
  users: [],
  isCoverImageUploaded: false,
  isProfileImgUploaded: false,
  isEmailSent: false,
  isVerified: false,
  emailMessage: undefined,
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

      // * Saving the user info to localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

// Async thunk action for user logout
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

// ! Fetching the public profile of a user
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

// ! Block a user action
export const blockUserAction = createAsyncThunk(
  "users/block-user",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${USERS_API}/block/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Unblock a user action
export const unblockUserAction = createAsyncThunk(
  "users/unblock-user",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${USERS_API}/unblock/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Fetch the private profile of a user
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

// ! Follow a user action
export const followUserAction = createAsyncThunk(
  "users/follow-user",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${USERS_API}/following/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Unfollow a user action
export const unfollowUserAction = createAsyncThunk(
  "users/unfollow-user",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${USERS_API}/unfollowing/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Upload profile picture action
export const uploadProfilePictureAction = createAsyncThunk(
  "users/upload-profile-image",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();
      formData.append("file", payload?.image);
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${USERS_API}/profile-picture`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Upload cover image action
export const uploadCoverImageAction = createAsyncThunk(
  "users/upload-cover-image",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${USERS_API}/cover-image`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const sendAccountVerificationEmailAction = createAsyncThunk(
  "users/send-account-verification-email",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${USERS_API}/account-verification-email`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyAccountAction = createAsyncThunk(
  "users/verify-account",
  async (verifyToken, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${USERS_API}/account-verification/${verifyToken}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const forgotPasswordAction = createAsyncThunk(
  "users/forgot-password",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${USERS_API}/forgot-password`,
        payload
      );

      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const passwordResetAction = createAsyncThunk(
  "users/password-reset",
  async ({ resetToken, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${USERS_API}/reset-password/${resetToken}`,
        {
          password,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUserProfileAction = createAsyncThunk(
  "users/update-user-profile",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${USERS_API}/update-profile/`,
        payload,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Users slice for handling actions like login, registration, profile updates, etc.
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    // Handling login actions
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

    // Handling register actions
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

    // Handling public profile fetch actions
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

    // Handling block user action
    builder.addCase(blockUserAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Handling unblock user action
    builder.addCase(unblockUserAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(unblockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(unblockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Handling profile updates like follow/unfollow, and image uploads
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

    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(followUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(followUserAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(unfollowUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(unfollowUserAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(uploadProfilePictureAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(uploadProfilePictureAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isProfileImgUploaded = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(uploadProfilePictureAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isProfileImgUploaded = false;
    });

    builder.addCase(uploadCoverImageAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(uploadCoverImageAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isCoverImageUploaded = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(uploadCoverImageAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isCoverImageUploaded = false;
    });

    builder.addCase(sendAccountVerificationEmailAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sendAccountVerificationEmailAction.fulfilled, (state) => {
      state.isEmailSent = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(
      sendAccountVerificationEmailAction.rejected,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(verifyAccountAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(verifyAccountAction.fulfilled, (state) => {
      state.isVerified = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(verifyAccountAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(forgotPasswordAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.isEmailSent = true;
      state.emailMessage = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(passwordResetAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(updateUserProfileAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUpdated = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateUserProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    });

    // Resetting success and error states
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
