import { IUser } from "./../../utils/TypeScript";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI, patchAPI } from "../../utils/FetchData";
import { checkImage, imageUpload } from "../../utils/ImageUpload";

import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from "../slices/alertSlice";
import { setAuth } from "../slices/authSlice";
import { IUpdateUserInfo } from "../types/profileTypes";

export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async ({ avatar, name, auth }: IUpdateUserInfo, thunkApi) => {
    if (!auth.access_token || !auth.user) return;

    let url = "";
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      if (avatar) {
        const check = checkImage(avatar);
        if (check) return thunkApi.dispatch(setAlertError({ error: check }));

        const photo = await imageUpload(avatar);
        url = photo.url;
      }

      thunkApi.dispatch(
        setAuth({
          access_token: auth.access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
        })
      );

      const res = await patchAPI(
        "user",
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
        },
        auth.access_token
      );

      thunkApi.dispatch(setAlertSuccess({ success: res.data.msg }));
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const getUser = createAsyncThunk(
  "profile/getUser",
  async (id: string, thunkApi) => {
    try {
      thunkApi.dispatch(setAlertLoading({ loading: true }));

      const res = await getAPI(`user/${id}`);

      thunkApi.dispatch(setAlertLoading({ loading: false }));

      return res.data as IUser;
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
