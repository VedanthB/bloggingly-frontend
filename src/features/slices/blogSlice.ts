import { createSlice } from "@reduxjs/toolkit";
import { createBlog } from "../actions/blogAction";

const initialState = {} as unknown;

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBlog.fulfilled, (state, action) => {});
    builder.addCase(createBlog.rejected, (state, action) => {});
  },
});

const { reducer } = blogSlice;

export default reducer;
