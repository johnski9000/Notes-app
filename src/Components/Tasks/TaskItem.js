import React from "react";
import right from "./selectItem.png";
import { useDispatch } from "react-redux";
import { setModal } from "../../Redux/userSlice";

function TaskItem({ task }) {
  const dispatch = useDispatch();
  return (
    <div
      className="flex justify-between items-center h-10 px-4 bg-gray-100 rounded-md cursor-pointer"
      onClick={() => dispatch(setModal(task))}
    >
      <div>{task.title}</div>
      <img src={right} alt="" className="w-5" />
    </div>
  );
}

export default TaskItem;
