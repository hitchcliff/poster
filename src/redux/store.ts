import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "./features/global.slice";

export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const Dispatch: AppDispatch = store.dispatch;
