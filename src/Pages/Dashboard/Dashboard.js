import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Menu from "./Menu/Menu";
import styles from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../Redux/userSlice";
import axios from "axios";
import SelectedTask from "./Selected/SelectedTask";

function Dashboard() {
  const { signOut, currentUser } = useAuth();
//   const userState = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  function handleClick(data) {
    dispatch(setUserData(data));
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      axios
        .get("http://localhost:8000/", {
            params: {
                email: currentUser.email
              }
        })
        .then(function (response) {
          // handle success
          console.log(response);
          handleClick(response.data)
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
  }, [currentUser]);

  return (
    <div className={styles.dashboardWrapper}>
      <Menu />
      <SelectedTask />
    </div>
  );
}

export default Dashboard;
