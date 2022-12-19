import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HelloState {
  loading: boolean;
}

const initialState: HelloState = {
  loading: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoadingSlice: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
  },
});

export const { setLoadingSlice } = globalSlice.actions;
