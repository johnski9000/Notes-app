import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Menu from "./Menu/Menu";
import styles from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../Redux/userSlice";
import axios from "axios";
import SelectedElement from "./Selected/SelectedElement";
import TaskModal from "./Selected/TaskModal";
import { apiURL, apiURLLocal } from "../../Variables/const";

function Dashboard() {
  const { currentUser } = useAuth();
  const { userData, selectedElement, modal } = useSelector(
    (state) => state.userData
  );
  const dispatch = useDispatch();
  function updateUserData(data) {
    console.log("data", data);
    dispatch(setUserData(data));
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      axios
        .get(apiURLLocal, {
          params: {
            email: currentUser.email,
          },
        })
        .then(function (response) {
          // handle success
          console.log(response);
          updateUserData(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  const displayModal = () => {
    if (modal) {
      return <TaskModal props={modal} />;
    }
  };
  return (
    <div className="relative w-[98%] h-[98%] relative sm:h-[90vh] sm:w-[90vw] max-w-[1440px] max-h-[1000px] mx-auto border border-solid border-gray-300 rounded-3xl flex shadow-md overflow-hidden">
      <Menu />
      <SelectedElement selectedElement={selectedElement} />
      {displayModal()}
    </div>
  );
}

export default Dashboard;
