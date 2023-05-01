import React from 'react'
import { useSelector } from 'react-redux';
import Today from './Today';
// import styles from "./Dashboard.module.css";


function SelectedTask() {
    const userState = useSelector((state) => state);
    const {selectedElement} = userState.userData
    console.log(selectedElement)

  return (
    <div className="selected_style_wrapper">
        {
            selectedElement === "Today" && 
            <Today />
        }
    </div>
  )
}

export default SelectedTask