import { createAsyncThunk } from "@reduxjs/toolkit";
import { postAPI } from "../../utils/FetchData";
import { IUserLogin } from "../../utils/TypeScript";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userLogin: IUserLogin, thunkApi) => {
    try {
      const res = await postAPI("login", userLogin);

      return {
        token: res.data.access_token,
        user: res.data.user,
      };
    } catch (err: any) {
      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
