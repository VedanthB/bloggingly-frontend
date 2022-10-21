import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../utils/TypeScript";
import { createComment } from "../actions/commentsAction";
import { ICommentState } from "../types/commentsTypes";

const initialState = {
  data: [],
  total: 1,
} as ICommentState;

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.data.push(action.payload as IComment);
    });
    builder.addCase(createComment.rejected, (state, action) => {});
  },
});

const { reducer } = commentsSlice;

export default reducer;
