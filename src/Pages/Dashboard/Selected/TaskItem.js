import React from 'react'
import styles from "../Dashboard.module.css";
import right from "../media/back.png"

function TaskItem({props, openModal, taskType}) {

    return (
    <div onClick={() => openModal({...props, taskType})} className={styles.todayListItem}>
        <div>{props.title}</div>
        <img src={right} alt=""/>
    </div>
  )
}

export default TaskItem
