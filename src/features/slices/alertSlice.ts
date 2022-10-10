import { createSlice } from "@reduxjs/toolkit";
import { IAlert } from "../types/alertTypes";

const initialState = {
  loading: false,
  error: null,
  success: null,
} as unknown as IAlert;

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertLoading: (state, { payload }) => {
      state.loading = payload.loading;
    },
    setAlertError: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
    setAlertSuccess: (state, { payload }) => {
      state.loading = false;
      state.success = payload.success;
    },
  },
});

const { reducer, actions } = alertSlice;

export const { setAlertLoading, setAlertError, setAlertSuccess } = actions;

export default reducer;
