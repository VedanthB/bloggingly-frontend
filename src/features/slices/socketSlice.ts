import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null as any,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    updateSocketState: (state, { payload }) => {
      state.socket = payload;
    },
  },
});

const { reducer, actions } = socketSlice;

export const { updateSocketState } = actions;

export default reducer;
