import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI, postAPI } from "../../utils/FetchData";
import { IUserLogin, IUserRegister } from "../../utils/TypeScript";
import { validRegister } from "../../utils/ValidRegister";
import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from "../slices/alertSlice";
import { IAuth } from "../types/authTypes";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userLogin: IUserLogin, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await postAPI("login", userLogin);

      thunkApi.dispatch(setAlertSuccess({ success: res.data.msg }));

      localStorage.setItem("loggedIn", "bloggingly");

      return res.data as IAuth;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userRegister: IUserRegister, thunkApi) => {
    const check = validRegister(userRegister);

    if (check.errLength > 0)
      return thunkApi.dispatch(setAlertError({ error: check.errMsg }));

    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await postAPI("register", userRegister);

      thunkApi.dispatch(setAlertSuccess({ success: res.data.msg }));

      return res;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (isLoggedIn: string | null, thunkApi) => {
    if (isLoggedIn !== "bloggingly") return;

    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await getAPI("refresh_token");

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return res.data;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (a: undefined, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      localStorage.removeItem("loggedIn");

      await getAPI("logout");

      window.location.href = "/";

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
