import { useState } from "react";
import "./edittodo.css";
import { BiArrowBack } from "react-icons/bi";
import { editTodo } from "../../../listSlice/ListSlice";
import { useDispatch } from "react-redux";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditTodo = ({ selectedTodos, setToggleEdit }) => {
  const [title, setTitle] = useState(selectedTodos.title);
  const [description, setdescription] = useState(selectedTodos.description);
  const dispatch = useDispatch();
  const handleEditSave = () => {
    if (!checkTodos) {
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
    let editedData = {
      ...selectedTodos,
      title: title,
      description: description,
    };
    dispatch(editTodo({ ...editedData }));
    setToggleEdit(false);
    toast.success("👌 Todo Updated!!!!!", {
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
  let checkTodos = Boolean(title) && Boolean(description);
  return (
    <div className="edit-todo">
      <title>
        <BiArrowBack onClick={() => setToggleEdit(false)} />
        <span>Edit Todo </span>
      </title>
      <div className="edit-todo-inputs">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <button onClick={handleEditSave}>save</button>
      </div>
    </div>
  );
};

export default EditTodo;
EditTodo.propTypes = {
  selectedTodos: Object,
  setToggleEdit: Boolean,
};
