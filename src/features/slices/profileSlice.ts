import { createSlice } from "@reduxjs/toolkit";
import { updateUser } from "../actions/profileAction";

const initialState = {};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {});
    builder.addCase(updateUser.rejected, (state, action) => {});
  },
});

const { reducer } = profileSlice;
export default reducer;
