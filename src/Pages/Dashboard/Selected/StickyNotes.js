import React from "react";
import styles from "../Dashboard.module.css";

function StickyNotes() {
  const StickyNote = () => {
    return (
      <li>
        <a href="#" contenteditable="true">
          <h2>Title #2</h2>
          <p>Text Content #2</p>
        </a>
      </li>
    );
  };
  return (
    <div className="w-full p-10">
      <h1 className="text-2xl font-bold">Sticky Notes</h1>
      <ul className={styles.stickyList}>
        <StickyNote />
      </ul>
    </div>
  );
}

export default StickyNotes;
