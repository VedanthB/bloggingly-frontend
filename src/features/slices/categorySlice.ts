import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getCategories } from "./../actions/categoryAction";
import { ICategory } from "./../../utils/TypeScript";

interface ICategoryState {
  categories?: ICategory[];
}

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
      console.log(payload);
      state.categories = payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {});
  },
});

const { reducer, actions } = categorySlice;

export default reducer;
