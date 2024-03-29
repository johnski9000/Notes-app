import React, { useState } from "react";
import styles from "../Dashboard.module.css";
import Tasks from "./Tasks";
import Upcoming from "./Upcoming";
import Calendar from "./Calendar";
import StickyNotes from "./StickyNotes";
import ListPage from "../../../Components/Lists/ListPage";

function SelectedElement({ selectedElement }) {
  const isList = selectedElement ? selectedElement.includes("List") : false;
  const renderElement = () => {
    if (isList) {
      return <ListPage />;
    }

    switch (selectedElement) {
      case "Today":
        return <Tasks />;
      case "Upcoming":
        return <Upcoming />;
      case "Calendar":
        return <Calendar />;
      case "Sticky Notes":
        return <StickyNotes />;
      default:
        return <Tasks />;
    }
  };
  return <div className="selected_style_wrapper">{renderElement()}</div>;
}

export default SelectedElement;
