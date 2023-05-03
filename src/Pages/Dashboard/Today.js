import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import add from "./add.png";
import { useSelector } from "react-redux";
import TodayListItem from "./TodayListItem";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

function Today({ list }) {
    const { signOut, currentUser } = useAuth();
    const {email} = currentUser._delegate
    const [data, setData] = useState()

    function handleChange(e) {
        e.preventDefault()
        setData(e.target.value)
    }
    function submitTask(e) {
        e.preventDefault()
        const inputData={email, data}
        axios.put('http://localhost:8000/todaysTasks', inputData)
  .then(response => {
    console.log('PUT request successful:', response);
  })
  .catch(error => {
    console.error('Error making PUT request:', error);
  });
    }
  console.log(list);
  return (
    <div className={styles.todayWrapper}>
      <h1 className={styles.todayTitle}>Today</h1>
      <div className={styles.addTask}>
        <button onClick={(e) => submitTask(e)}>
          <img src={add} alt="" />
        </button>
        <input onChange={(e) => handleChange(e)}/>
      </div>
      <div className={styles.listWrapper}> {list && list.map((item, index) => <TodayListItem props={item}>item {index}</TodayListItem>)}</div>
    </div>
  );
}

export default Today;
