import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI, postAPI } from "../../utils/FetchData";
import { imageUpload } from "../../utils/ImageUpload";
import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from "../slices/alertSlice";
import {
  IBlogs,
  IBlogsCategory,
  ICreateBlog,
  IGetBlogsByCategoryParams,
} from "../types/blogTypes";

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async ({ blog, token }: ICreateBlog, thunkApi) => {
    let url;

    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };

      const res = await postAPI("blog", newBlog, token);

      console.log(res);

      thunkApi.dispatch(setAlertLoading({ loading: false }));
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (x: undefined, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await getAPI("home/blogs");

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return res.data as IBlogs[];
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const getBlogsByCategoryId = createAsyncThunk(
  "blog/getBlogsByCategoryId",
  async ({ id, search }: IGetBlogsByCategoryParams, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      let limit = 4;

      let value = search ? search : `?page=${1}`;

      const res = await getAPI(`blogs/${id}${value}&limit=${limit}`);

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return { ...res.data, id, search } as IBlogsCategory;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
