import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../slices/posts/postsSlice";
import usersReducer from "../slices/users/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});

export default store;
