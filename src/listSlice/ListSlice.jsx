import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "lists",
  initialState: [],
  reducers: {
    addList: (state, action) => {
      const newList = {
        id: new Date().getTime().toLocaleString(),
        listTitle: action.payload.listTitle,
        todos: [],
      };
      state.push(newList);
    },
    addTodo: (state, action) => {
      return state.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            todos: [
              ...list.todos,
              {
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
              },
            ],
          };
        }
        return list;
      });
    },
    editTodo: (state, action) => {
      return state.map((list) => {
        if (list.id === action.payload.singleListId) {
          let newList = list.todos.filter(
            (singleTodo) => singleTodo.id !== action.payload.id
          );
          return {
            ...list, //list id and list title
            todos: [
              ...newList,
              {
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
              },
            ],
          };
        }
        return list;
      });
    },
  },
});

export const { addList, addTodo, editTodo } = listSlice.actions;
export default listSlice.reducer;
