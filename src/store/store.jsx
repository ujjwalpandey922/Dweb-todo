import { configureStore } from "@reduxjs/toolkit";
import ListSlice from "../listSlice/ListSlice";
const initialData=[]
export const store = configureStore({
  reducer: {
    lists: ListSlice,
  },
  preloadedState: initialData,
});
