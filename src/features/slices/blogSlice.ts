import { createSlice } from "@reduxjs/toolkit";
import { createBlog, getBlogs } from "../actions/blogAction";
import { IBlogs } from "../types/blogTypes";

const initialState: IBlogs[] = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBlog.fulfilled, (state, action) => {});
    builder.addCase(createBlog.rejected, (state, action) => {});
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {});
  },
});

const { reducer } = blogSlice;

export default reducer;
