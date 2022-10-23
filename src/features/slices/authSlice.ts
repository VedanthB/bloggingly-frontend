import { createSlice } from "@reduxjs/toolkit";
import { googleLogin, logout, refreshToken } from "../actions/authAction";
import { IAuth } from "../types/authTypes";

const initialState = {
  msg: null,
  access_token: null,
  user: null,
} as IAuth;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.access_token = payload?.access_token;
      state.user = payload?.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.msg = action.payload?.msg;
      state.access_token = action.payload?.access_token;
      state.user = action.payload?.user;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {});
    builder.addCase(logout.fulfilled, (state, action) => {});
    builder.addCase(logout.rejected, (state, action) => {});
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.msg = action.payload?.msg;
      state.access_token = action.payload?.access_token;
      state.user = action.payload?.user;
    });
    builder.addCase(googleLogin.rejected, (state, action) => {});
  },
});

const { reducer, actions } = authSlice;
export const { setAuth } = actions;
export default reducer;
