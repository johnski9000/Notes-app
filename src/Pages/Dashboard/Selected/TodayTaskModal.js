import React from "react";
import styles from "../Dashboard.module.css";

function TodayTaskModal({saveTask, handleChangeModal, image, setModal, deleteTask, props }) {
  console.log(props)
  return (
    <div className={styles.today_task_modal}>
      <div className={styles.modal_title}>
        Task:
        <img src={image} alt="" onClick={() => setModal(null)} />
      </div>
      <div className={styles.taskData}>
        <div className={styles.taskTitle}>
          <input value={props.title} type="text" id="title" name="title" onChange={(e) => handleChangeModal(e)}/>
        </div>
        <div className={styles.description}>
        <textarea value={props.description} type="text" id="description" name="description" onChange={(e) => handleChangeModal(e)}/>

        </div>
      </div>
      <div className={styles.modal_buttons}>
        <button onClick={(e) => deleteTask(e)}>Delete Task</button>
        <button onClick={(e) => saveTask(e)}>Save Changes</button>
      </div>
    </div>
  );
}

export default TodayTaskModal;
