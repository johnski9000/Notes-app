import React from 'react'
import styles from "../Dashboard.module.css"


function TaskTab({children}) {
  return (
    <div className={styles.taskTab}>{children}</div>
  )
}

export default TaskTab