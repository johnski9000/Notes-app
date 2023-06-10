import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../../Context/AuthContext";
import { setUserData } from "../../../Redux/userSlice";
import styles from "../Dashboard.module.css";
import add from "../media/add.png";
import { useDispatch } from "react-redux";
import TaskItem from "./TaskItem";

function Upcoming({openModal, saveUserData}) {
  // const [data, setData] = useState();
  const [today, setToday] = useState();
  const [tomorrow, setTomorrow] = useState();
  const [week, setWeek] = useState();
  const userState = useSelector((state) => state);
  const { TasksToday } = userState.userData.userData.collections;
  const { TasksTomorrow } = userState.userData.userData.collections;
  const { TasksWeek } = userState.userData.userData.collections;

  const { currentUser } = useAuth();

  const { email } = currentUser ? currentUser._delegate : {};
  const dispatch = useDispatch();

  // function saveUserData() {
  //   axios
  //     .get("https://notes-server-lac.vercel.app/", {
  //       params: {
  //         email: email,
  //       },
  //     })
  //     .then(function (response) {
  //       // handle success
  //       console.log(response);

  //       dispatch(setUserData(response.data));
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  // }
  function sendData(inputData) {
    axios
      .put("https://notes-server-lac.vercel.app/setTask", inputData)
      .then((response) => {
        console.log("PUT request successful:", response);
        saveUserData(response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
        return error;
      });
  }
  async function submitTask(e) {
    e.preventDefault();
    console.log(e.target.name);
    if (!today && !tomorrow && !week) {
      alert("Insert a task!");
      return;
    } else {
      if (e.target.name === "today") {
        const inputData = { email, data: today, taskType: "TasksToday" };
        setToday("")
        const res = await sendData(inputData);
        console.log(res);
      } 
      else if (e.target.name === "tomorrow") {
        console.log("sending")
        const inputData = { email, data: tomorrow, taskType: "TasksTomorrow" };
        setTomorrow("")
        const res = await sendData(inputData);
        console.log(res);
      } 
      else if (e.target.name === "week") {
        const inputData = { email, data: week, taskType: "TasksWeek" };
        setWeek("")
        const res = await sendData(inputData);
        console.log(res);
      }
    }
  }
  function handleChange(e) {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === "today") {
      setToday(e.target.value);
    } else if (e.target.name === "tomorrow") {
      setTomorrow(e.target.value);
    } else if (e.target.name === "week") {
      setWeek(e.target.value);
    }
  }

  return (
    <div className={styles.todayParentWrapper}>
      <div className={styles.todayWrapper}>
        <h1 className={styles.todayTitle}>Upcoming</h1>
        <div className={styles.upcomingWrapper}>
          <div className={styles.upcomingRowOne}>
            <h3>Today</h3>
            <div className={styles.addTaskUpcoming}>
              <button onClick={(e) => submitTask(e)}>
                <img src={add} alt="" name="today" />
              </button>
              <input value={today} onChange={(e) => handleChange(e)} name="today" />
            </div>
            <div className={styles.tasksWrapper}>
              {TasksToday &&
                TasksToday.map((item, index) => (
                  <TaskItem props={item} key={index}  openModal={openModal} taskType="TasksToday"></TaskItem>
                ))}
            </div>
          </div>
          <div className={styles.upcomingRowTwo}>
            <div className={styles.upcomingRowTwoChild}>
              <h3>Tomorrow</h3>
              <div className={styles.addTaskUpcoming}>
                <button onClick={(e) => submitTask(e)}>
                  <img src={add} alt="" name="tomorrow"/>
                </button>
                <input value={tomorrow} onChange={(e) => handleChange(e)} name="tomorrow" />
              </div>
              <div className={styles.tasksWrapper}>
                {TasksTomorrow &&
                  TasksTomorrow.map((item, index) => (
                    <TaskItem props={item} key={index}  openModal={openModal}  taskType="TasksTomorrow"></TaskItem>
                  ))}
              </div>
            </div>
            <div className={styles.upcomingRowTwoChild}>
              <h3>This Week</h3>
              <div className={styles.addTaskUpcoming}>
                <button onClick={(e) => submitTask(e)}>
                  <img src={add} alt="" name="week"/>
                </button>
                <input value={week} onChange={(e) => handleChange(e)} name="week" />
              </div>
              <div className={styles.tasksWrapper}>
                {TasksWeek &&
                  TasksWeek.map((item, index) => (
                    <TaskItem props={item} key={index} openModal={openModal} taskType="TasksWeek"></TaskItem>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Upcoming;
