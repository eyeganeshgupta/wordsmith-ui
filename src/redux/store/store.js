import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slices/categories/categoriesSlice";
import commentReducer from "../slices/comments/commentsSlice";
import postsReducer from "../slices/posts/postsSlice";
import usersReducer from "../slices/users/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    categories: categoriesReducer,
    comments: commentReducer,
  },
});

export default store;
