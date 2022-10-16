import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./../actions/categoryAction";

import { ICategoryState } from "../types/categoryTypes";

const initialState: ICategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state?.categories?.push(payload);
    });
    builder.addCase(createCategory.rejected, (state, action) => {});
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {});
    builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
      state.categories = state?.categories?.map((item) =>
        item._id === payload?._id ? { ...item, name: payload?.name } : item
      );
    });
    builder.addCase(updateCategory.rejected, (state, action) => {});
    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      state.categories = state?.categories?.filter(
        (item) => item._id !== payload
      );
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {});
  },
});

const { reducer, actions } = categorySlice;

export default reducer;
