import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HelloState {
  hi: string;
}

const initialState: HelloState = {
  hi: "",
};

export const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {
    say: (state, { payload }: PayloadAction<string>) => {
      state.hi = payload;
    },
  },
});

export const { say } = helloSlice.actions;
