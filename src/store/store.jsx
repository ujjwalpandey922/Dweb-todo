import { configureStore } from "@reduxjs/toolkit";
// import todoReducer from "../todoSlice/TodoSlice";
import ListSlice from "../listSlice/ListSlice";
export const store = configureStore({
  reducer: {
    // todos: todoReducer,
    lists: ListSlice,
  },
});
