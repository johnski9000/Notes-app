import React, { useState } from "react";
import styles from "../Dashboard.module.css";
import add from "../media/add.png";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";


function Today({openModal, saveUserData}) {
  const { currentUser } = useAuth();
  const userState = useSelector((state) => state);
  const { TasksToday } = userState.userData.userData.collections;
  const { email } = currentUser ? currentUser._delegate : {};
  const [data, setData] = useState();

  function handleChange(e) {
    e.preventDefault();
    setData(e.target.value);
  }

  function submitTask(e) {
    e.preventDefault();
    const inputData = { email, data, taskType : "TasksToday" };
    if (data === undefined || data === "") {
      console.error("Cannot use an empty string!");
    } else {
      axios
        .put(
          "https://notes-server-lac.vercel.app/setTask"
          , inputData)
        .then((response) => {
          console.log("PUT request successful:", response);
          saveUserData(response.data);
        })
        .catch((error) => {
          console.error("Error making PUT request:", error);
        });
    }
  }

    
  return (
    <div className={styles.todayParentWrapper}>
      <div className={styles.todayWrapper}>
        <h1 className={styles.todayTitle}>Today</h1>
        <div className={styles.addTask}>
          <button onClick={(e) => submitTask(e)}>
            <img src={add} alt="" />
          </button>
          <input onChange={(e) => handleChange(e)} />
        </div>
        <div className={styles.listWrapper}>
          {" "}
          {TasksToday &&
            TasksToday.map((item, index) => (
              <TaskItem props={item} key={index} openModal={openModal} taskType="TasksToday">
                item {index}
              </TaskItem>
            ))}
        </div>
      </div>

    </div>
  );
}

export default Today;
