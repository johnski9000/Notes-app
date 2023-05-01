import React from 'react'
import styles from "./Dashboard.module.css"


function ListTab({children}) {
  return (
    <div className={styles.taskTab}>{children}</div>
  )
}

export default ListTab