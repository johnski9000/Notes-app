import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { apiURLLocal } from "../../Variables/const";
import { useAuth } from "../../Context/AuthContext";
import AddTask from "./AddTask";
import TasksDisplayContainer from "./TasksDisplayContainer";

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
      case 3:
        return "Completed";
      default:
        return "Due Today";
    }
  })();
  useEffect(() => {
    try {
      axios
        .get(`${apiURLLocal}/tasks`, {
          params: {
            email: currentUser.email,
          },
        })
        .then((response) => {
          setTasks(response.data);
        });
    } catch (error) {}
  }, []);
  if (tasks === null) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <AddTask />
      <div className="flex flex-col gap-4">
        <TasksDisplayContainer tasks={tasks} filter={taskFilter} />
      </div>
    </div>
  );
}

export default TasksContainer;
