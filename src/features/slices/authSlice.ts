import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions/authAction";
import { IAuth } from "../types/authTypes";

const initialState = {
  token: null,
  user: null,
} as IAuth;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload?.token;
      state.user = action.payload?.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {});
  },
});

const { reducer } = authSlice;
export default reducer;
