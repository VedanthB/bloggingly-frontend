import { IComment } from "./../../utils/TypeScript";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from "../slices/alertSlice";
import {
  ICommentState,
  ICreateCommentData,
  IGetCommentsParams,
  IUpdateCommentData,
} from "../types/commentsTypes";
import { getAPI, postAPI } from "../../utils/FetchData";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ data, token }: ICreateCommentData, thunkApi) => {
    try {
      const res = await postAPI("comment", data, token);

      return { ...res.data, user: data.user } as IComment;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const getComments = createAsyncThunk(
  "comments/getComments",
  async ({ id, num }: IGetCommentsParams, thunkApi) => {
    try {
      let limit = 4;

      const res = await getAPI(
        `comments/blog/${id}?page=${num}&limit=${limit}`
      );

      console.log(res.data.comments, res);

      return {
        data: res.data.comments as IComment[],
        total: res.data.total as number,
      } as ICommentState;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const replyComment = createAsyncThunk(
  "comments/replyComment",
  async ({ data, token }: ICreateCommentData, thunkApi) => {
    try {
      const res = await postAPI("reply_comment", data, token);

      console.log(res.data.comments, res);

      return {
        ...res.data,
        user: data.user,
        reply_user: data.reply_user,
      };
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ data, token }: IUpdateCommentData, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      // const res = await postAPI('comment', data, token)

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      // return res.data,
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
