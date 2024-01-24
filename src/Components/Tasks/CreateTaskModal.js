import React, { useRef } from "react";
import styles from "../Dashboard.module.css";
import add from "../media/add.png";
import close from "../media/close.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearModal,
  removeSubTask,
  updateModal,
} from "../../../Redux/userSlice";
import { apiURLLocal } from "../../../Variables/const";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import remove from "../media/x-button.png";
import ListModal from "../../../Components/Tasks/ListModal";

function CreateTaskModal() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { modal } = useSelector((state) => state.userData);
  const subTaskRef = useRef(null);
  const formattedDueDate = () => {
    if (modal.due_date) {
      if (modal.due_date._seconds === undefined) {
        return modal.due_date;
      } else {
        const dueDate = new Date(
          modal.due_date._seconds * 1000 + modal.due_date._nanoseconds / 1000000
        );
        return dueDate.toISOString().split("T")[0];
      }
    } else {
      return "";
    }
  };
  const deleteTask = () => {
    console.log(modal);
    axios
      .put(apiURLLocal + "/deleteTask", {
        email: auth.currentUser.email,
        id: modal.id,
      })
      .then((response) => {
        console.log(response);
        dispatch(clearModal());
        window.location.reload();
      });
  };
  const updateTask = () => {
    axios
      .put(apiURLLocal + "/updateTask", {
        email: auth.currentUser.email,
        data: modal,
      })
      .then((response) => {
        console.log(response);
        dispatch(clearModal());
        window.location.reload();
      });
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
            onChange={(e) =>
              dispatch(updateModal({ value: e.target.value, title: "title" }))
            }
          />
        </div>
        <div className={styles.description}>
          <textarea
            value={modal.description || ""}
            type="text"
            id="description"
            name="description"
            onChange={(e) =>
              dispatch(
                updateModal({ value: e.target.value, title: "description" })
              )
            }
          />
        </div>
        <div className={styles.date}>
          Due date
          <input
            value={formattedDueDate()}
            type="date"
            id="date"
            name="date"
            onChange={(e) =>
              dispatch(
                updateModal({ value: e.target.value, title: "due_date" })
              )
            }
          />
        </div>
        <ListModal list={modal.list} />

        <div>
          <h3 className="pb-4">Subtasks:</h3>
          <div className={styles.addTaskModal}>
            <button>
              <img
                src={add}
                alt=""
                onClick={() =>
                  dispatch(
                    updateModal({
                      value: subTaskRef.current.value,
                      title: "subTasks",
                    })
                  )
                }
              />
            </button>
            <input type="text" id="subTask" name="subTask" ref={subTaskRef} />
          </div>
          <div className={styles.subTaskWrapper} id="no-scrollbar">
            {modal.subTasks &&
              modal.subTasks.map((item, index) => (
                <div
                  key={index}
                  className={styles.subTaskItem}
                  onClick={() => dispatch(removeSubTask(index))}
                >
                  <img src={remove} alt="delete item" /> {item}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.modal_buttons}>
        <button onClick={() => deleteTask()}>Delete Task</button>
        <button onClick={() => updateTask()}>Save Changes</button>
      </div>
    </div>
  );
}

export default CreateTaskModal;
