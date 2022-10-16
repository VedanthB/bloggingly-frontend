import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../utils/FetchData";

import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from "../slices/alertSlice";
import {
  ICreateCategory,
  IDeleteCategory,
  IUpdateCategory,
} from "../types/categoryTypes";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ name, access_token }: ICreateCategory, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await postAPI("category", { name }, access_token);

      thunkApi.dispatch(setAlertSuccess({ success: "New Category Created" }));

      return res.data.newCategory;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (x: undefined, thunkApi) => {
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

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ data, access_token }: IUpdateCategory, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      await patchAPI(`category/${data._id}`, { name: data.name }, access_token);

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return data;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id, access_token }: IDeleteCategory, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      await deleteAPI(`category/${id}`, access_token);

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return id;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
