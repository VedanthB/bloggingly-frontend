import { createAsyncThunk } from "@reduxjs/toolkit";
import { postAPI } from "../../utils/FetchData";
import { imageUpload } from "../../utils/ImageUpload";
import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from "../slices/alertSlice";
import { ICreateBlog } from "../types/blogTypes";

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
