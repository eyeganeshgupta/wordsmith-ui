import { createAsyncThunk } from "@reduxjs/toolkit";

export const resetSuccessAction = createAsyncThunk(
  "reset-success-action",
  () => {
    return true;
  }
);

export const resetErrorAction = createAsyncThunk("reset-error-action", () => {
  return true;
});
