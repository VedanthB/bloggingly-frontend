import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../utils/TypeScript";
import {
  createComment,
  deleteComment,
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
  reducers: {
    updateReply: (state, action) => {
      state.data = state.data.map((item) =>
        item._id === action.payload.comment_root
          ? {
              ...item,
              replyCM: item.replyCM?.map((rp) =>
                rp._id === action.payload._id ? action.payload : rp
              ),
            }
          : item
      );
    },
    updateCommentState: (state, action) => {
      state.data = state.data.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    deleteReply: (state, action) => {
      state.data = state.data.map((item) =>
        item._id === action.payload.comment_root
          ? {
              ...item,
              replyCM: item.replyCM?.filter(
                (rp) => rp._id !== action.payload._id
              ),
            }
          : item
      );
    },
    deleteCommentState: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload._id);
    },
  },
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
              replyCM: [action.payload, ...item.replyCM],
            }
          : item
      );
    });
    builder.addCase(replyComment.rejected, (state, action) => {});
    builder.addCase(updateComment.fulfilled, (state, action) => {});
    builder.addCase(updateComment.rejected, (state, action) => {});
    builder.addCase(deleteComment.fulfilled, (state, action) => {});
    builder.addCase(deleteComment.rejected, (state, action) => {});
  },
});

const { reducer, actions } = commentsSlice;

export const {
  updateCommentState,
  updateReply,
  deleteReply,
  deleteCommentState,
} = actions;

export default reducer;
