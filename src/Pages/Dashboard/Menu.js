import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import ListTab from "./ListTab";
import menu from "./menu.png";
import search from "./search.png";
import TaskTab from "./TaskTab";
import listImg from "./list.png";
import rightImg from "./right.png";
import calenderImg from "./calendar.png";
import stickyImg from "./sticky-note.png";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedElement } from "../../Redux/userSlice";


function Menu() {
  const [searchInput, setSearchInput] = useState();
  const userState = useSelector((state) => state);


  function handleChangeSearch(e) {
    setSearchInput(e.target.value);
  }

  const dispatch = useDispatch();

  function handleClick(data) {
    dispatch(setSelectedElement(data));
  }

  return (
    <div className={styles.MenuWrapper}>
      <div className={styles.titleSection}>
        <div className={styles.menuTitle}>Menu</div>
        <div className={styles.menuImage}>
          <img src={menu} alt="menu" />
        </div>
      </div>
      <div className={styles.searchBar}>
        <label htmlFor="search" className={styles.searchImg}>
          <img src={search} alt="search" />
        </label>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            id="search"
            onChange={(e) => handleChangeSearch(e)}
          />
        </div>
      </div>
      <div className={styles.tasksTitle}>Tasks</div>
      <TaskTab>
        <ul className={styles.taskList}>
          <li onClick={() => handleClick("Upcoming")}>
            <img src={rightImg} alt="upcoming" />
            Upcoming
          </li>
          <li onClick={() => handleClick("Today")}>
            <img src={listImg} alt="today" />
            Today
          </li>
          <li onClick={() => handleClick("Calendar")}>
            <img src={calenderImg} alt="calendar" />
            Calendar
          </li>
          <li onClick={() => handleClick("Sticky Wall")}>
            <img src={stickyImg} alt="sticky wall" />
            Sticky Wall
          </li>
        </ul>
      </TaskTab>
      <div className={styles.tasksTitle}>Lists</div>
      <ListTab></ListTab>
    </div>
  );
}

export default Menu;
