import { createSlice } from "@reduxjs/toolkit";
import { getUser, updateUser } from "./../actions/profileAction";
import { IUser } from "../../utils/TypeScript";

const initialState = {
  users: [] as IUser[],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {});
    builder.addCase(updateUser.rejected, (state, action) => {});
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.users.push(action.payload as IUser);
    });
    builder.addCase(getUser.rejected, (state, action) => {});
  },
});

const { reducer } = profileSlice;
export default reducer;
