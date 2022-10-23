import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import createSocketIoMiddleware from "redux-socket.io";

import io from "socket.io-client";

import authReducer from "../features/slices/authSlice";
import alertReducer from "../features/slices/alertSlice";
import profileReducer from "../features/slices/profileSlice";
import categoryReducer from "../features/slices/categorySlice";
import blogReducer from "../features/slices/blogSlice";
import commentsReducer from "../features/slices/commentsSlice";
import socketReducer from "../features/slices/socketSlice";

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const socket = io();

console.log(socket);

let socketIoMiddleware = createSocketIoMiddleware(socket, "socket/");

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    profile: profileReducer,
    category: categoryReducer,
    blogsState: blogReducer,
    comments: commentsReducer,
    socketState: socketReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketIoMiddleware),
});
