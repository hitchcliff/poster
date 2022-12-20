import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HelloState {
  loading: boolean;
  toggleComments: boolean;
}

const initialState: HelloState = {
  loading: true,
  toggleComments: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoadingSlice: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setToggleCommentsSlice: (state, { payload }) => {
      state.toggleComments = payload;
    },
  },
});

export const { setLoadingSlice, setToggleCommentsSlice } = globalSlice.actions;
