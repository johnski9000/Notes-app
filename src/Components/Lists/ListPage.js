import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiURLLocal } from "../../Variables/const";
import { useAuth } from "../../Context/AuthContext";
import { setModal } from "../../Redux/userSlice";

function ListPage() {
  const { userData, selectedElement } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  console.log("state", userData.collections.Tasks);
  const list = selectedElement && selectedElement.slice(4);

  return (
    <div className="flex-1 p-10">
      <h1 className="font-bold text-2xl">{list}</h1>
      <div className="h-full pt-10 flex flex-col gap-6 overflow-y-scroll">
        {userData.collections.Tasks &&
          userData.collections.Tasks.map((task, index) => {
            if (task.list === list) {
              return (
                <div
                  key={index}
                  onClick={() => {
                    dispatch(setModal(task));
                  }}
                  className="border border-solid border-gray-300 rounded-md p-2"
                >
                  <p>
                    <span className="font-bold">Title:</span> {task.title}
                  </p>
                  <p>
                    <span className="font-bold">Description:</span>{" "}
                    {task.description}
                  </p>
                  <p>
                    <span className="font-bold">Due Date:</span>{" "}
                    {task.due_date.slice(0, 10)}
                  </p>
                  <p>
                    <span className="font-bold">Complete:</span>{" "}
                    {task.completed}
                  </p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default ListPage;
