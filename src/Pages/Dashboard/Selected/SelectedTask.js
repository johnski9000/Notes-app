import React from 'react'
import { useSelector } from 'react-redux';
import Calendar from './Calendar';
import Upcoming from './Upcoming';
import StickyNotes from './StickyNotes';
import Today from './Today';


function SelectedTask() {
    const userState = useSelector((state) => state);
    const {selectedElement,} = userState.userData

  return (
    <div className="selected_style_wrapper">
      {
            selectedElement === "Upcoming" && userState ? 
            <Upcoming
            /> : null
        }
        {
            selectedElement === "Today" && userState ? 
            <Today 
            /> : null
        }
        {
            selectedElement === "Calendar" && userState ? 
            <Calendar 
            /> : null
        }
        {
            selectedElement === "Sticky Notes" && userState ? 
            <StickyNotes 
            /> : null
        }
    </div>
  )
}

export default SelectedTask