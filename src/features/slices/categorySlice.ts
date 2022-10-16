import { createCategory } from "./../actions/categoryAction";
import { ICategory } from "./../../utils/TypeScript";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ICategory[] = [];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state = payload;
    });
    builder.addCase(createCategory.rejected, (state, action) => {});
  },
});

const { reducer, actions } = categorySlice;

export default reducer;
