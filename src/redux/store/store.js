import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slices/categories/categoriesSlice";
import postsReducer from "../slices/posts/postsSlice";
import usersReducer from "../slices/users/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    categories: categoriesReducer,
  },
});

export default store;
