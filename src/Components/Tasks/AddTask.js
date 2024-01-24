import React, { useState } from "react";
import add from "../../Pages/Dashboard/media/add.png";
import axios from "axios";
import { apiURLLocal } from "../../Variables/const";
import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addATask } from "../../Redux/userSlice";

function AddTask() {
  const [task, setTask] = useState("");
  const auth = useAuth();
  const dispatch = useDispatch();
  const addTask = () => {
    console.log("test");
    axios
      .put(`${apiURLLocal}/setTask`, {
        title: task,
        email: auth.currentUser.email,
      })
      .then((res) => {
        console.log(res);
        setTask("");
        dispatch(addATask(res.data));
      });
  };
  return (
    <div className="flex flex-1 max-h-[50px] border border-solid border-gray-300 rounded-[5px] relative mb-8">
      <button
        onClick={(e) => addTask()}
        className="w-50 flex justify-center items-center bg-transparent border-none absolute right-[10px] bottom-0 top-0"
      >
        <img src={add} alt="" name="today" className="w-[15px] h-auto" />
      </button>
      <input
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
        value={task}
        name="today"
        className="border-none bg-transparent w-full calc-[50px] h-[40px] pl-4"
      />
    </div>
  );
}

export default AddTask;
