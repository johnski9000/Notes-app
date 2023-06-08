import React, { useState } from "react";
import styles from "../Dashboard.module.css";
import add from "../media/add.png";
import remove from "../media/delete.png";


function TodayTaskModal({
  saveTask,
  handleChangeModal,
  image,
  setModal,
  deleteTask,
  props,
  submitSubTask,
  deleteSubTask
}) {
  const [subTask, setSubTask] = useState();

  function handleChange(e) {
    setSubTask(e.target.value);
  }

  return (
    <div className={styles.today_task_modal}>
      <div className={styles.modal_title}>
        Task:
        <img src={image} alt="" onClick={() => setModal(null)} />
      </div>
      <div className={styles.taskData}>
        <div className={styles.taskTitle}>
          <input
            value={props.title}
            type="text"
            id="title"
            name="title"
            onChange={(e) => handleChangeModal(e)}
          />
        </div>
        <div className={styles.description}>
          <textarea
            value={props.description}
            type="text"
            id="description"
            name="description"
            onChange={(e) => handleChangeModal(e)}
          />
        </div>
        <div className={styles.date}>
          Due date
          <input
            value={props.dueDate || ""}
            type="date"
            id="date"
            name="date"
            onChange={(e) => handleChangeModal(e)}
          />{" "}
        </div>
        <div className={styles.tags}>
        <label for="cars">Choose a list:</label>

<select name="cars" id="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
        </div>
        <div>
          <h3>Subtasks:</h3>
          <div className={styles.addTaskModal}>
            <button>
              <img src={add} alt="" onClick={() => submitSubTask(subTask)} />
            </button>
            <input
              type="text"
              id="subTask"
              name="subTask"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={styles.subTaskWrapper}>
            {props.subTasks &&
              props.subTasks.map((item, index) => (
                <div key={index} className={styles.subTaskItem}>
                 <img src={remove} alt="delete item" onClick={(index) => deleteSubTask(index)}/> {item}
                </div>
              ))}
          </div>
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
