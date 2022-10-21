import { IComment } from "./../../utils/TypeScript";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from "../slices/alertSlice";
import { ICreateCommentData } from "../types/commentsTypes";
import { postAPI } from "../../utils/FetchData";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ data, token }: ICreateCommentData, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await postAPI("comment", data, token);

      thunkApi.dispatch(setAlertSuccess({ success: res.data.msg }));

      localStorage.setItem("loggedIn", "bloggingly");

      return { ...res.data, user: data.user } as IComment;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
