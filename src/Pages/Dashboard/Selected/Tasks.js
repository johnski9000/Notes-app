import React, { useState } from "react";

import TasksContainer from "../../../Components/Tasks/TasksContainer";
import TasksMenu from "../../../Components/Tasks/TasksMenu";

function Tasks() {
  const [selected, setSelected] = useState(0);

  return (
    <div
      className="flex flex-1 flex-col overflow-y-scroll p-10 gap-10"
      id="no-scrollbar"
    >
      <TasksMenu selected={selected} setSelected={setSelected} />
      <div
        className="flex-1 overflow-y-scroll flex flex-col gap-20 mt-20 h-full"
        id="no-scrollbar"
      >
        <TasksContainer selectedTaskFilter={selected} />
      </div>
    </div>
  );
}

export default Tasks;
