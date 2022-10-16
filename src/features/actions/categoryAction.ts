import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI, postAPI } from "../../utils/FetchData";
import { ICategory } from "../../utils/TypeScript";
import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from "../slices/alertSlice";

export interface ICreateCategory {
  name: string;
  access_token: string;
}

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ name, access_token }: ICreateCategory, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await postAPI("category", { name }, access_token);

      thunkApi.dispatch(setAlertSuccess({ success: "New Category Created" }));

      return res.data.categories;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async ({}, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await getAPI("category");

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return res.data.categories;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
