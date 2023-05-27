import EditTodo from "./EditTodo/EditTodo";
import "./todo.css";
import add from "../../assets/add.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../../listSlice/ListSlice";
import TodosOfEachList from "./TodosOfEachList/TodosOfEachList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Todo = () => {
  const [list, setList] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState({});
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  let checkList = Boolean(list);

  const handleAddList = () => {
    if (!checkList) {
      toast.warn("👎 Enter List Title!", {
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
    dispatch(addList({ listTitle: list }));
    setList("");
     toast.success("👌 List Added!", {
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
  console.log(lists);
  return (
    <div className="todo">
      <div className="todo-container">
        <div className="todo-container-input">
          <input
            type="text"
            placeholder="Add A List"
            value={list}
            onChange={(e) => setList(e.target.value)}
          />{" "}
          <button onClick={handleAddList}>
            <img src={add} alt="" />
          </button>
        </div>
        {lists.map((singleList) => (
          <TodosOfEachList
            key={singleList.id}
            singleList={singleList}
            setToggleEdit={setToggleEdit}
            setSelectedTodos={setSelectedTodos}
          />
        ))}
      </div>
      {toggleEdit && (
        <div className="todo-edit-wrapper">
          <div className="todo-edit-container slide-in-right">
            <EditTodo
              setToggleEdit={setToggleEdit}
              selectedTodos={selectedTodos}
              setSelectedTodos={setSelectedTodos}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Todo;
