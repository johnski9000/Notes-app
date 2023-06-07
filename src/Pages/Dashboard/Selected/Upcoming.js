import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { setUserData } from "../../../Redux/userSlice";
import styles from "../Dashboard.module.css";
import add from "../media/add.png";


function Upcoming() {
  const [data, setData] = useState();

  const { currentUser } = useAuth();

  const { email } = currentUser ? currentUser._delegate : {};

  function saveUserData() {
    axios
      .get("http://localhost:8000/", {
        params: {
          email: email,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response);

        dispatchEvent(setUserData(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  function submitTask(e) {
    e.preventDefault();
    const inputData = { email, data, taskType : "TasksToday" };
    if (data === undefined || data === "") {
      console.error("Cannot use an empty string!");
    } else {
      axios
        .put("http://localhost:8000/setTask", inputData)
        .then((response) => {
          console.log("PUT request successful:", response);
          saveUserData(response.data);
        })
        .catch((error) => {
          console.error("Error making PUT request:", error);
        });
    }
  }
  function handleChange(e) {
    e.preventDefault();
    setData(e.target.value);
  }

  return (
    <div className={styles.todayParentWrapper}>
      <div className={styles.todayWrapper}>
        <h1 className={styles.todayTitle}>Upcoming</h1>
        <div className={styles.upcomingWrapper}>
          <div className={styles.upcomingRowOne}>
          <h2 >Today</h2>
          <div className={styles.addTaskUpcoming}>
          <button onClick={(e) => submitTask(e)}>
            <img src={add} alt="" />
          </button>
          <input onChange={(e) => handleChange(e)} />
        </div>
          </div>
          <div className={styles.upcomingRowTwo}>
            <div className={styles.upcomingRowTwoChild}>
            <h2 >Today</h2>
            <div className={styles.addTaskUpcoming}>
          <button onClick={(e) => submitTask(e)}>
            <img src={add} alt="" />
          </button>
          <input onChange={(e) => handleChange(e)} />
        </div>
            </div>
            <div className={styles.upcomingRowTwoChild}>
            <h2 >Today</h2>
            <div className={styles.addTaskUpcoming}>
          <button onClick={(e) => submitTask(e)}>
            <img src={add} alt="" />
          </button>
          <input onChange={(e) => handleChange(e)} />
        </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Upcoming;