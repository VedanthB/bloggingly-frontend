import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../utils/FetchData";
import { imageUpload } from "../../utils/ImageUpload";
import { setAlertError, setAlertLoading } from "../slices/alertSlice";
import {
  IBlogs,
  IBlogsCategory,
  IBlogsUser,
  ICreateBlog,
  IGetBlogsByCategoryParams,
  IGetBlogsByUserIdParams,
} from "../types/blogTypes";

interface IAddBlog extends ICreateBlog {
  navigate: NavigateFunction;
}

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async ({ blog, token, navigate }: IAddBlog, thunkApi) => {
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

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      thunkApi.dispatch(getBlogs());

      navigate("/");
      return res.data;
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

      const res = await getAPI(`blogs/category/${id}${value}&limit=${limit}`);

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return { ...res.data, id, search } as IBlogsCategory;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const getBlogsByUserId = createAsyncThunk(
  "blog/getBlogsByUserId",
  async ({ id, search }: IGetBlogsByUserIdParams, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      let limit = 3;

      let value = search ? search : `?page=${1}`;

      const res = await getAPI(`blogs/user/${id}${value}&limit=${limit}`);

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return { ...res.data, id, search } as IBlogsUser;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
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

      const res = await putAPI(`blog/${newBlog._id}`, newBlog, token);

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return blog;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async ({ blog, token }: ICreateBlog, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      await deleteAPI(`blog/${blog._id}`, token);

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return blog;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
