import { useState } from "react";
import edit from "../../../assets/edit.png";
import PropTypes from "prop-types";
import add from "../../../assets/add.png";
import todologo from "../../../assets/todologo.png";
import { useDispatch } from "react-redux";
import { addTodo, removeList, removeTodo } from "../../../listSlice/ListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillDelete } from "react-icons/ai";
import addressData from "../../../contractConfig.json";
import "./todoOfEachList.css";
import {
  // useContractRead,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import { useEffect } from "react";
const TodosOfEachList = ({
  singleList,
  setToggleEdit,
  setSelectedTodos,
  selectedTodos,
}) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const dispatch = useDispatch();

  // ===================WRITE IN TODO LIST=========================
  const { config } = usePrepareContractWrite({
    address: addressData.address,
    abi: addressData.abi,
    functionName: "addTodo",
    args: [singleList.id.toString(), todoTitle, todoDescription],
  });
  const { data, write: addTodosContract } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  //   checkTodo

  let checkTodo = Boolean(todoTitle) && Boolean(todoDescription);

  //=========================handleEdit========================

  const handleEdit = (singleTodo) => {
    setToggleEdit(true);
    setSelectedTodos({ ...singleTodo, singleListId: singleList.id });
  };
  // ====================HANDEL TODOS+++++++++++++++++++++++++++++
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
    addTodosContract?.();
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
    }
  }, [isLoading, isSuccess]);

  // =====================REMOVE LIST++++++++++++++++++++++++++++
  const { config: configRemoveList } = usePrepareContractWrite({
    address: addressData.address,
    abi: addressData.abi,
    functionName: "removeList",
    args: [singleList.id],
  });
  const { data: removeListData, write: removeListWrite } =
    useContractWrite(configRemoveList);
  const { isLoading: removeListIsLoading, isSuccess: removeListIsSuccess } =
    useWaitForTransaction({
      hash: removeListData?.hash,
    });
  const handleRemoveList = () => {
    removeListWrite?.();
  };
  useEffect(() => {
    if (removeListIsLoading && !removeListIsSuccess) {
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
    } else if (!removeListIsLoading && removeListIsSuccess) {
      toast.dismiss();
      dispatch(removeList({ listId: singleList.id }));
      toast.success("👌 List Removed!!!", {
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
  }, [removeListIsLoading, removeListIsSuccess]);

  // ====================REMOVE SINGLE TODD--------------------------

  const { config: configRemoveTodo } = usePrepareContractWrite({
    address: addressData.address,
    abi: addressData.abi,
    functionName: "deleteTodo",
    args: [selectedTodos.id, selectedTodos.singleListId],
  });
  const { data: removeTodoData, write: removeTodoWrite } =
    useContractWrite(configRemoveTodo);
  const { isLoading: removeTodoIsLoading, isSuccess: removeTodoIsSuccess } =
    useWaitForTransaction({
      hash: removeTodoData?.hash,
    });

  const handleRemoveTodo = (singleTodo) => {
    setSelectedTodos({ ...singleTodo, singleListId: singleList.id });
    removeTodoWrite?.();
  };

  useEffect(() => {
    if (removeTodoIsLoading && !removeTodoIsSuccess) {
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
    } else if (!removeTodoIsLoading && removeTodoIsSuccess) {
      toast.dismiss();
      dispatch(removeTodo({ listId: singleList.id, todoId: selectedTodos.id }));
      toast.success("👌 Todo Removed!!!", {
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
  }, [removeTodoIsLoading, removeTodoIsSuccess]);

  return (
    <div className="todo-list">
      <div
        className="todo-container-input todo-list-title"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>{singleList.id}</h3>
        <button onClick={handleRemoveList}>
          <AiFillDelete size={25} className="handleRemoveList" />
        </button>
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
            <img src={add} alt="" className="handleRemoveList" />
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
            <div className="todo-card-title-buttons">
              <button onClick={() => handleEdit(singleTodo)}>
                <img src={edit} alt="" className="handleRemoveList" />
              </button>
              <button onClick={() => handleRemoveTodo(singleTodo)}>
                <AiFillDelete
                  size={28}
                  style={{ marginLeft: "10" }}
                  className="handleRemoveList"
                />
              </button>
            </div>
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
  singleList: PropTypes.any,
  setToggleEdit: PropTypes.any,
  setSelectedTodos: PropTypes.any,
  selectedTodos: PropTypes.any,
};
