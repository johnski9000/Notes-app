import React from 'react'
import styles from "./Dashboard.module.css";
import right from "./back.png"

function TodayListItem({props, openModal}) {

    return (
    <div onClick={() => openModal(props)} className={styles.todayListItem}>
        <div>{props.title}</div>
        <img src={right} alt=""/>
    </div>
  )
}

export default TodayListItem
