import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      const newList = {
        id: action.payload.listId,
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
                id: action.payload.todoId,
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
    removeList: (state, action) => {
      const remainingList = state.filter(
        (singleList) => singleList.id !== action.payload.listId
      );
      return remainingList;
    },
    removeTodo: (state, action) => {
      return state.map((list) => {
        if (list.id === action.payload.listId) {
          const remainingTodos = list.todos.filter(
            (singleTodo) => singleTodo.id !== action.payload.todoId
          );
          return {
            ...list,
            todos: [...remainingTodos],
          };
        }
        return list;
      });
    },
  },
});

export const { addList, addTodo, editTodo, removeList, removeTodo } =
  listSlice.actions;
export default listSlice.reducer;
