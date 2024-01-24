import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { convertFirestoreTimestamp, filterTasks } from "./functions";
import { useDispatch, useSelector } from "react-redux";

function TasksDisplayContainer({ filter }) {
  const [filteredTasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const tasks = useSelector(
    (state) => state.userData.userData.collections.Tasks
  );
  console.log("tasks", tasks);
  useEffect(() => {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      due_date: convertFirestoreTimestamp(task.due_date),
    }));

    filterTasks(updatedTasks, filter).then((response) => {
      setTasks(response);
    });
  }, [tasks, filter]);
  return (
    <div className="flex flex-col gap-4">
      {filteredTasks.map((task, index) => {
        return (
          <div key={index}>
            <TaskItem task={task} />
          </div>
        );
      })}
      {filteredTasks.length === 0 && (
        <div className="text-center text-gray-400 text-2xl">No tasks</div>
      )}
    </div>
  );
}

export default TasksDisplayContainer;
