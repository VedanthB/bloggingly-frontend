import { createAsyncThunk } from "@reduxjs/toolkit";
import { postAPI } from "../../utils/FetchData";
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
