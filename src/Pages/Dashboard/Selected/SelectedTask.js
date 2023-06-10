import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import Upcoming from "./Upcoming";
import StickyNotes from "./StickyNotes";
import Today from "./Today";
import TaskModal from "./TaskModal";
import axios from "axios";
import { setUserData } from "../../../Redux/userSlice";
import close from "../media/close.png";

function SelectedTask({ currentUser }) {
  const [modal, setModal] = useState(null);
  const { email } = currentUser ? currentUser._delegate : {};
  const dispatch = useDispatch();
  const userState = useSelector((state) => state);
  const { selectedElement } = userState.userData;

  function handleChangeModal(e) {
    if (e.target.name === "title") {
      setModal((prevModal) => ({
        ...prevModal,
        title: e.target.value,
      }));
    } else if (e.target.name === "description") {
      setModal((prevModal) => ({
        ...prevModal,
        description: e.target.value,
      }));
    } else if (e.target.name === "date") {
      setModal((prevModal) => ({
        ...prevModal,
        dueDate: e.target.value,
      }));
      console.log(modal);
    } else if (e.target.name === "lists") {
      setModal((prevModal) => ({
        ...prevModal,
        list: e.target.value,
      }));
    }
  }
  function saveUserData() {
    axios
      .get("https://notes-server-lac.vercel.app/", {
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
  function submitSubTask(subTask) {
    if (modal.subTasks) {
      setModal((prevModal) => ({
        ...prevModal,
        subTasks: [...modal.subTasks, subTask],
      }));
    } else {
      setModal((prevModal) => ({
        ...prevModal,
        subTasks: [subTask],
      }));
    }
  }
  function deleteSubTask(index) {
    setModal((prevModal) => {
      const updatedSubTasks = [...prevModal.subTasks];
      updatedSubTasks.splice(index, 1);

      return {
        ...prevModal,
        subTasks: updatedSubTasks,
      };
    });
  }
  function openModal(data) {
    setModal(null);
    setModal(data);
  }
  function saveTask(e) {
    e.preventDefault();
    axios
      .put(
        // "http://localhost:8000/updateTask",

        "https://notes-server-lac.vercel.app/updateTask",
        { ...modal, email }
      )
      .then((response) => {
        console.log("PUT request successful:", response);
        saveUserData();
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
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

  return (
    <div className="selected_style_wrapper">
      {selectedElement === "Upcoming" && userState ? <Upcoming openModal={openModal} saveUserData={saveUserData}/> : null}
      {selectedElement === "Today" && userState ? (
        <Today openModal={openModal} saveUserData={saveUserData} />
      ) : null}
      {selectedElement === "Calendar" && userState ? <Calendar /> : null}
      {selectedElement === "Sticky Notes" && userState ? <StickyNotes /> : null}
      {modal && (
        <TaskModal
          saveTask={saveTask}
          handleChangeModal={handleChangeModal}
          setModal={setModal}
          image={close}
          deleteTask={deleteTask}
          props={modal}
          submitSubTask={submitSubTask}
          deleteSubTask={deleteSubTask}
          lists={userState.userData.userData.collections.Lists}
        ></TaskModal>
      )}
    </div>
  );
}

export default SelectedTask;
