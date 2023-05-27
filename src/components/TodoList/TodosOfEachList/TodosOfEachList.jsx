import { useState } from "react";
import edit from "../../../assets/edit.png";

import add from "../../../assets/add.png";
import todologo from "../../../assets/todologo.png";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../listSlice/ListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TodosOfEachList = ({ singleList, setToggleEdit, setSelectedTodos }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const dispatch = useDispatch();
  const handleAddTodos = () => {
    if (!checkTodo) {
      toast.warn("👎 Enter Todo Info!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    dispatch(
      addTodo({
        listId: singleList.id,
        title: todoTitle,
        description: todoDescription,
      })
    );
    setTodoDescription("");
    setTodoTitle("");
    toast.success("👌 Todo Added!!!!!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  //   checkTodo

  let checkTodo = Boolean(todoTitle) && Boolean(todoDescription);

  //handleEdit

  const handleEdit = (singleTodo) => {
    setToggleEdit(true);
    setSelectedTodos({ ...singleTodo, singleListId: singleList.id });
  };
  //   console.log(singleList);

  return (
    <div className="todo-list">
      <div className="todo-container-input todo-list-title">
        <h3>{singleList.listTitle}</h3>
      </div>
      <div className="todo-card">
        <div className="todo-card-title">
          <div className="todo-card-title-info">
            <img src={todologo} alt="" />
            <input
              type="text"
              placeholder="Add Todo Title"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />{" "}
          </div>
          <button disabled={!checkTodo} onClick={handleAddTodos}>
            <img src={add} alt="" />
          </button>
        </div>
        <textarea
          type="text"
          placeholder="Add Todo Description"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />{" "}
      </div>
      {singleList.todos?.map((singleTodo) => (
        <div
          className="todo-cards-display todo-card todo-selected"
          key={singleTodo.id}
        >
          <div className="todo-card-title">
            <div className="todo-card-title-info">
              <img src={todologo} alt="" />
              <h1>{singleTodo.title}</h1>
            </div>
            <button onClick={() => handleEdit(singleTodo)}>
              <img src={edit} alt="" />
            </button>
          </div>
          <h2>{singleTodo.description}</h2>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default TodosOfEachList;
TodosOfEachList.propTypes = {
  singleList: Number,
  setToggleEdit: Boolean,
  setSelectedTodos: Object,
};
