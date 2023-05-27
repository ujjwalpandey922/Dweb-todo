import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      
      const newTodo = {
        id: new Date().getTime().toLocaleString(),
        title: action.payload.title,
        description: action.payload.description,
      };
      state.push(newTodo);
    },
  },
});

// export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
