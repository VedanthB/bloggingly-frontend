import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../actions/authAction";
import { IAuth } from "../types/authTypes";

const initialState = {
  msg: null,
  access_token: null,
  user: null,
} as IAuth;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.msg = action.payload?.msg;
      state.access_token = action.payload?.access_token;
      state.user = action.payload?.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {});
    builder.addCase(registerUser.fulfilled, (state, action) => {});
    builder.addCase(registerUser.rejected, (state, action) => {});
  },
});

const { reducer } = authSlice;
export default reducer;
