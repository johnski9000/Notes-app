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
  const { email } = currentUser ? currentUser._delegate : {};
  const [data, setData] = useState();
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();

  function saveUserData() {
    axios
      .get(
        "https://notes-server-lac.vercel.app/"
        , {
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
    console.log(e.target.name);
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
    else if (e.target.name === "date") {
      setModal(prevModal => ({
        ...prevModal,
        dueDate: e.target.value
      }));
      console.log(modal)
    } else if (e.target.name === "lists") {
      setModal(prevModal => ({
        ...prevModal,
        list: e.target.value
      }));
      console.log(modal)
    }
  }
  function submitSubTask(subTask){
    console.log(modal)
    if (modal.subTasks) {
      setModal(prevModal => ({
        ...prevModal,
        subTasks: [...modal.subTasks ,subTask]
      }));
    } else {
      setModal(prevModal => ({
        ...prevModal,
        subTasks: [subTask]
      }));
    }
  }
  function deleteSubTask(index) {
    setModal(prevModal => {
      const updatedSubTasks = [...prevModal.subTasks];
      updatedSubTasks.splice(index, 1);
      
      return {
        ...prevModal,
        subTasks: updatedSubTasks
      };
    });
  }
function saveTask(e) {
e.preventDefault()
const taskType = "TasksToday"
axios
        .put(
          // "http://localhost:8000/updateTask"

          "https://notes-server-lac.vercel.app/updateTask"
          , {...modal, email, taskType})
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
  function deleteTask(e) {
    e.preventDefault();
    const inputData = { email, data: modal.id };
    axios
      .put("https://notes-server-lac.vercel.app/deleteTask", inputData)
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
              <TodayListItem props={item} key={index} openModal={openModal}>
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
          submitSubTask={submitSubTask}
          deleteSubTask={deleteSubTask}
          lists={userState.userData.userData.collections.Lists}
        ></TodayTaskModal>
      )}
    </div>
  );
}

export default Today;
