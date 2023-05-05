import React from "react";
import styles from "../Dashboard.module.css";

function TodayTaskModal({ close, setModal, deleteTask }) {
  return (
    <div className={styles.today_task_modal}>
      <div className={styles.modal_title}>
        Task:
        <img src={close} alt="" onClick={() => setModal(null)} />
      </div>
      <div className={styles.modal_buttons}>
        <button onClick={(e) => deleteTask(e)}>Delete Task</button>
        <button>Save Changes</button>
      </div>
    </div>
  );
}

export default TodayTaskModal;
