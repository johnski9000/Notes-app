import React, { useState } from "react";
import styles from "../Dashboard.module.css";
import add from "../media/add.png";
import { useDispatch, useSelector } from "react-redux";
import TodayListItem from "./TodayListItem";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { setUserData } from "../../../Redux/userSlice";
import close from "../media/close.png";
import TodayTaskModal from "./TodayTaskModal";

function Today() {
  const { currentUser } = useAuth();
  const userState = useSelector((state) => state);
  const { TasksToday } = userState.userData.userData.collections;
  console.log(TasksToday)
  const { email } = currentUser ? currentUser._delegate : {};
  const [data, setData] = useState();
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();
  console.log(email)
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

        dispatch(setUserData(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function handleChange(e) {
    e.preventDefault();
    setData(e.target.value);
  }
  function handleChangeModal(e) {
    console.log(e.target.value);
    if (e.target.name === "title") {
      setModal(prevModal => ({
        ...prevModal,
        title: e.target.value
      }));
    } else if (e.target.name === "description") {
      setModal(prevModal => ({
        ...prevModal,
        description: e.target.value
      }));
    }
  }
function saveTask(e) {
e.preventDefault()
const taskType = "TasksToday"
axios
        .put("http://localhost:8000/updateTask", {...modal, email, taskType})
        .then((response) => {
          console.log("PUT request successful:", response);
          saveUserData()
        })
        .catch((error) => {
          console.error("Error making PUT request:", error);
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
  function deleteTask(e) {
    e.preventDefault();
    const inputData = { email, data: modal.id };
    axios
      .post("http://localhost:8000/deleteTask", inputData)
      .then((response) => {
        console.log("PUT request successful:", response);
        saveUserData(response.data);
        setModal(null);
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  }

  function openModal(data) {
    setModal(data);
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
              <TodayListItem props={item} openModal={openModal}>
                item {index}
              </TodayListItem>
            ))}
        </div>
      </div>
      {modal && (
        <TodayTaskModal
        saveTask={saveTask}
        handleChangeModal={handleChangeModal}
          setModal={setModal}
          image={close}
          deleteTask={deleteTask}
          props={modal}
        ></TodayTaskModal>
      )}
    </div>
  );
}

export default Today;

// function convertTimestampToDate(timestamp, timezoneOffset = 1) {
//   const { _seconds, _nanoseconds } = timestamp;
//   const milliseconds = _seconds * 1000 + _nanoseconds / 1000000;
//   const date = new Date(milliseconds);
//   const utcDate = new Date(date.getTime() + timezoneOffset * 60 * 60 * 1000);

//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     timeZoneName: "short",
//   };

//   return utcDate.toLocaleString("en-GB", options);
// }

//   const timestamp = { _seconds: 1683125931, _nanoseconds: 708000000 };
//   const timezoneOffset = 1; // UTC+1
//   const dateString = convertTimestampToDate(timestamp, timezoneOffset);
//   console.log('Date:', dateString);
