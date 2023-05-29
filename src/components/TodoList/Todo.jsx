import EditTodo from "./EditTodo/EditTodo";
import "./todo.css";
import add from "../../assets/add.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList, addTodo } from "../../listSlice/ListSlice";
import TodosOfEachList from "./TodosOfEachList/TodosOfEachList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addressData from "../../contractConfig.json";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";

const Todo = () => {
  const [list, setList] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState({});
  const dispatch = useDispatch();
  let lists = useSelector((state) => state.lists);
  let checkList = Boolean(list);

  //===============gettodos==================

  const { data: readingTodosData } = useContractRead({
    address: addressData.address,
    abi: addressData.abi,
    functionName: "getTodos",
    args: ["0x658e54e4578a46d251aba72380afb2d08d8ccc30"],
  });
  useEffect(() => {
    readingTodosData?.map((list) => {
      dispatch(addList({ listId: list.id }));
      if (list.todos) {
        list.todos.map((todo) => {
          dispatch(
            addTodo({
              listId: list.id,
              todoId: todo.id,
              title: todo.title,
              description: todo.description,
            })
          );
        });
      }
    });
  }, [readingTodosData]);
  // ====================useWrite========================

  const { config } = usePrepareContractWrite({
    address: addressData.address,
    abi: addressData.abi,
    functionName: "addList",
    args: [list],
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  // ====================AddList========================
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
    write?.();
  };
  useEffect(() => {
    if (isLoading && !isSuccess) {
      toast.loading("Wait.....", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (!isLoading && isSuccess) {
      toast.dismiss();
      dispatch(addList({ listId: list }));
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
    }
  }, [isLoading, isSuccess]);

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
            <img src={add} alt="" className="handleAddList"/>
          </button>
        </div>
        {lists?.map((singleList) => (
          <TodosOfEachList
            key={singleList.id}
            singleList={singleList}
            setToggleEdit={setToggleEdit}
            setSelectedTodos={setSelectedTodos}
            selectedTodos={selectedTodos}
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
