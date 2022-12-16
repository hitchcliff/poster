import { configureStore } from "@reduxjs/toolkit";
import { helloSlice } from "./features/hello.slice";

export const store = configureStore({
  reducer: {
    hello: helloSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const Dispatch: AppDispatch = store.dispatch;
