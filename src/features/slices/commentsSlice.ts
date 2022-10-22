import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../utils/TypeScript";
import {
  createComment,
  getComments,
  replyComment,
  updateComment,
} from "../actions/commentsAction";
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
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.data = action?.payload?.data as IComment[];
      state.total = action?.payload?.total as number;
    });
    builder.addCase(getComments.rejected, (state, action) => {});
    builder.addCase(replyComment.fulfilled, (state, action) => {
      state.data = state.data.map((item) =>
        item._id === action.payload.comment_root
          ? {
              ...item,
              replyCM: [action.payload, ...(item.replyCM as [])],
            }
          : item
      );
    });
    builder.addCase(replyComment.rejected, (state, action) => {});
    builder.addCase(updateComment.fulfilled, (state, action) => {});
    builder.addCase(updateComment.rejected, (state, action) => {});
  },
});

const { reducer } = commentsSlice;

export default reducer;
