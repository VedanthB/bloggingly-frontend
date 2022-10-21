import { createSlice } from "@reduxjs/toolkit";
import {
  createBlog,
  getBlogs,
  getBlogsByCategoryId,
  getBlogsByUserId,
} from "../actions/blogAction";
import { IBlogs, IBlogsCategory, IBlogsUser } from "../types/blogTypes";

const initialState = {
  blogs: [] as IBlogs[],
  blogsByCategory: [] as IBlogsCategory[],
  userBlogs: [] as IBlogsUser[],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBlog.fulfilled, (state, action) => {});
    builder.addCase(createBlog.rejected, (state, action) => {});
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload as IBlogs[];
    });
    builder.addCase(getBlogs.rejected, (state, action) => {});
    builder.addCase(getBlogsByCategoryId.fulfilled, (state, action) => {
      if (
        state.blogsByCategory.every((item) => item.id !== action?.payload?.id)
      ) {
        state.blogsByCategory.push(action.payload as IBlogsCategory);
      } else {
        state.blogsByCategory = state.blogsByCategory.map((blog) =>
          blog.id === action?.payload?.id ? action.payload : blog
        );
      }
    });
    builder.addCase(getBlogsByCategoryId.rejected, (state, action) => {});
    builder.addCase(getBlogsByUserId.fulfilled, (state, action) => {
      if (state.userBlogs.every((item) => item.id !== action?.payload?.id)) {
        state.userBlogs.push(action.payload as IBlogsUser);
      } else {
        state.userBlogs = state.userBlogs.map((blog) =>
          blog.id === action?.payload?.id ? action.payload : blog
        );
      }
    });
    builder.addCase(getBlogsByUserId.rejected, (state, action) => {});
  },
});

const { reducer } = blogSlice;

export default reducer;
