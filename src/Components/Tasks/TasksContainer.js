import React, { useState } from "react";
import { useEffect } from "react";
import TaskItem from "./TaskItem";
import axios from "axios";
import { apiURLLocal } from "../../Variables/const";
import { useAuth } from "../../Context/AuthContext";
import AddTask from "./AddTask";

function TasksContainer({ selectedTaskFilter }) {
  const [tasks, setTasks] = useState(null);
  const { currentUser } = useAuth();
  const taskFilter = (() => {
    switch (selectedTaskFilter) {
      case 0:
        return "Due Today";
      case 1:
        return "Upcoming";
      case 2:
        return "Overdue";
      // Add more cases as needed
      default:
        return "Due Today";
    }
  })();
  useEffect(() => {
    try {
      axios
        .get(`${apiURLLocal}/tasks`, {
          params: {
            taskFilter: taskFilter,
            email: currentUser.email,
          },
        })
        .then((response) => {
          console.log(response.data);
          setTasks(response.data);
        });
    } catch (error) {}
  }, [taskFilter, currentUser.email]);
  if (tasks === null) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <AddTask />
      <div className="flex flex-col gap-4">
        {tasks.map((task) => {
          return <TaskItem task={task} />;
        })}
      </div>
    </div>
  );
}

export default TasksContainer;
