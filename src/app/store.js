import { configureStore } from "@reduxjs/toolkit";
import fleoReducer from "../features/fleo/fleoSlice";

export const store = configureStore({
  reducer: {
    fleo: fleoReducer,
  },
});
