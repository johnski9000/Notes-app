import React from "react";
import styles from "../Dashboard.module.css";
import { useSelector } from "react-redux";
import CreateNote from "../../../Components/Tasks/CreateNote";
import StickyNote from "./StickyNote";
function StickyNotes() {
  const { Notes } = useSelector((state) => state.userData.userData.collections);

  return (
    <div className="w-full p-10">
      <h1 className="text-2xl font-bold">Sticky Notes</h1>
      <ul className={styles.stickyList}>
        <CreateNote />
        {Notes.map((note) => {
          return <StickyNote props={note} />;
        })}
      </ul>
    </div>
  );
}

export default StickyNotes;
