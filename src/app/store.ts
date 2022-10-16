import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../features/slices/authSlice";
import alertReducer from "../features/slices/alertSlice";
import profileReducer from "../features/slices/profileSlice";
import categoryReducer from "../features/slices/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    profile: profileReducer,
    categories: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
