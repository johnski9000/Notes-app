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
  const userState = useSelector((state) => state);
  const {email} = userState.userData.userData && userState.userData.userData.userData
  const dispatch = useDispatch();

  function updateUserData(data) {
    dispatch(setUserData(data));
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      axios
        .get("https://notes-server-lac.vercel.app", {
            params: {
                email: currentUser.email
              }
        })
        .then(function (response) {
          // handle success
          console.log(response);
          updateUserData(response.data)
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
      {
        userState.userData.userData ? <> <Menu/>
        <SelectedTask currentUser={currentUser}/></> :
        <div>loading...</div>
      }
    </div>
  );
}

export default Dashboard;
