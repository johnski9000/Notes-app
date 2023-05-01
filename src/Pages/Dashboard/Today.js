import React from 'react'
import styles from "./Dashboard.module.css";
import add from "./add.png"



function Today() {
  return (
    <div>
        <h1 className={styles.todayTitle}>Today</h1>
        <div className={styles.addTask}>
            <label>
                <img src={add} alt=''/>
            </label>
            <input/>
        </div>
    </div>
  )
}

export default Today