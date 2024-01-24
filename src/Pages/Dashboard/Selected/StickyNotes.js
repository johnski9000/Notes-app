import React from "react";
import styles from "../Dashboard.module.css";
import { useSelector } from "react-redux";
import CreateNote from "../../../Components/Notes/CreateNote";
import StickyNote from "../../../Components/Notes/StickyNote";
function StickyNotes() {
  const state = useSelector((state) => state.userData);
  console.log("state", state);
  const Notes = state.userData ? state.userData.collections.Notes : [];
  console.log("Notes", Notes);
  return (
    <div className="w-full p-10">
      <h1 className="text-2xl font-bold">Sticky Notes</h1>
      <ul className={styles.stickyList}>
        <CreateNote />
        {Notes &&
          Notes.map((note) => {
            return <StickyNote props={note} />;
          })}
      </ul>
    </div>
  );
}

export default StickyNotes;
