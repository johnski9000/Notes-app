import React, { useEffect, useState } from "react";
import styles from "../Dashboard.module.css";
import add from "../media/add.png";
import close from "../media/close.png";
import { useDispatch, useSelector } from "react-redux";
import { clearModal } from "../../../Redux/userSlice";

function TaskModal() {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.userData);
  const formattedDueDate = () => {
    if (modal.due_date) {
      const dueDate = new Date(
        modal.due_date._seconds * 1000 + modal.due_date._nanoseconds / 1000000
      );
      return dueDate.toISOString().split("T")[0];
    } else {
      return "";
    }
  };

  return (
    <div className={styles.today_task_modal} id="no-scrollbar">
      <div className={styles.modal_title}>
        Task:
        <img src={close} alt="" onClick={() => dispatch(clearModal())} />
      </div>
      <div className={styles.taskData}>
        <div className={styles.taskTitle}>
          <input
            value={modal.title || ""}
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div className={styles.description}>
          <textarea
            value={modal.body || ""}
            type="text"
            id="description"
            name="description"
          />
        </div>
        <div className={styles.date}>
          Due date
          <input
            value={formattedDueDate()}
            type="date"
            id="date"
            name="date"
          />{" "}
        </div>
        <div className={styles.tags}>
          <label htmlFor="lists">Choose a list:</label>

          <select name="lists" id="lists" value={""}>
            <option>Select a list</option>
            {/* {lists &&
              lists.map((item, index) => (
                <option key={index} name="list">
                  {item.title}
                </option>
              ))} */}
          </select>
        </div>
        <div>
          <h3 className="pb-4">Subtasks:</h3>
          <div className={styles.addTaskModal}>
            <button>
              <img src={add} alt="" />
            </button>
            <input type="text" id="subTask" name="subTask" />
          </div>
          <div className={styles.subTaskWrapper} id="no-scrollbar">
            {/* {data.subTasks &&
              data.subTasks.map((item, index) => (
                <div key={index} className={styles.subTaskItem}>
                  <img src={remove} alt="delete item" /> {item}
                </div>
              ))} */}
          </div>
        </div>
      </div>
      <div className={styles.modal_buttons}>
        <button>Delete Task</button>
        <button>Save Changes</button>
      </div>
    </div>
  );
}

export default TaskModal;
