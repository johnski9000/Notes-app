import React, { useState } from 'react'
import TaskItem from './TaskItem';
import styles from "../Dashboard.module.css";
import add from "../media/add.png";
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext';


function List({title, props, saveUserData, openModal}) {
    const [data, setData] = useState();
    const { currentUser } = useAuth();

    const { email } = currentUser ? currentUser._delegate : {};

    const flattenedArray = Object.values(props).flatMap((array) => array);
    const filteredArray = flattenedArray.filter((item) => item.list === title)
    console.log("flattened array",filteredArray)
    function handleChange(e) {
        e.preventDefault();
        setData(e.target.value);
      }
    
      function submitTask(e) {
        e.preventDefault();
        const inputData = { email, data, taskType : "TasksToday", list: title };
        if (data === undefined || data === "") {
          console.error("Cannot use an empty string!");
        } else {
          axios
            .put(
                "http://localhost:8000/setTask"
            //   "https://notes-server-lac.vercel.app/setTask"
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
       <h1 className={styles.todayTitle}>{title}</h1>
       <div className={styles.addTask}>
         <button onClick={(e) => submitTask(e)}>
           <img src={add} alt="" />
         </button>
         <input onChange={(e) => handleChange(e)} />
       </div>
       <div className={styles.listWrapper}>
         {" "}
         {filteredArray.map((item, index) => (
           <TaskItem props={item} openModal={openModal}/>
        ))}
       </div>
     </div>

   </div>
  )
}

export default List