import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI, postAPI } from "../../utils/FetchData";

import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from "../slices/alertSlice";
import { IAuth } from "../types/authTypes";

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

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (id_token: string, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await postAPI("google_login", { id_token });

      thunkApi.dispatch(setAlertSuccess({ success: res.data.msg }));

      localStorage.setItem("loggedIn", "bloggingly");

      return res.data as IAuth;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
