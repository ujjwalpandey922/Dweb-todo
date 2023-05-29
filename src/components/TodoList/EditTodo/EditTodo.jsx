import { useEffect, useState } from "react";
import "./edittodo.css";
import { BiArrowBack } from "react-icons/bi";
import { editTodo } from "../../../listSlice/ListSlice";
import { useDispatch } from "react-redux";
import {
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addressData from "../../../contractConfig.json";
const EditTodo = ({ selectedTodos, setToggleEdit }) => {
  const [title, setTitle] = useState(selectedTodos.title);
  const [description, setdescription] = useState(selectedTodos.description);
  const dispatch = useDispatch();

  const { config: configUpdateTodo } = usePrepareContractWrite({
    address: addressData.address,
    abi: addressData.abi,
    functionName: "updateTodo",
    args: [selectedTodos.id, selectedTodos.singleListId, title, description],
  });
  const { data: updateTodoData, write: updateTodoWrite } =
    useContractWrite(configUpdateTodo);
  const { isLoading: updateTodoIsLoading, isSuccess: updateTodoIsSuccess } =
    useWaitForTransaction({
      hash: updateTodoData?.hash,
    });

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
    updateTodoWrite?.();
  };
  useEffect(() => {
    if (updateTodoIsLoading && !updateTodoIsSuccess) {
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
    } else if (!updateTodoIsLoading && updateTodoIsSuccess) {
      let editedData = {
        ...selectedTodos,
        title: title,
        description: description,
      };
      toast.dismiss();
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
    }
  }, [updateTodoIsLoading, updateTodoIsSuccess]);
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
