import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { setAlertError, setAlertLoading } from "../slices/alertSlice";
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
        console.log(photo);
      }

      thunkApi.dispatch(setAlertLoading({ loading: false }));
    } catch (err: any) {
      thunkApi.dispatch(setAlertError({ error: err.response.data.msg }));

      thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);
