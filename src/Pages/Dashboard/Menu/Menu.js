import React, { useState } from "react";
import styles from "../Dashboard.module.css";
import menu from "../media/menu.png";
import search from "../media/search.png";
import TaskTab from "../Selected/TaskTab";
import listImg from "../media/list.png";
import rightImg from "../media/right.png";
import calenderImg from "../media/calendar.png";
import stickyImg from "../media/sticky-note.png";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedElement } from "../../../Redux/userSlice";
import MenuItem from "./MenuItem";
import { useAuth } from "../../../Context/AuthContext";
import logout from "../media/logout.png"


function Menu() {
  const { signOut } = useAuth();
  const [searchInput, setSearchInput] = useState();
  const userState = useSelector((state) => state);

  function handleChangeSearch(e) {
    setSearchInput(e.target.value);
  }

  const dispatch = useDispatch();

  function handleClick(data) {
    dispatch(setSelectedElement(data));
    console.log(userState);
  }
  const TaskItems = [
    { name: "Upcoming", image: rightImg },
    { name: "Today", image: listImg },
    { name: "Calendar", image: calenderImg },
    { name: "Sticky Notes", image: stickyImg },
  ];
  const ListItems = [
    { name: "Upcoming", image: rightImg },
    { name: "Today", image: listImg },
    { name: "Calendar", image: calenderImg },
    { name: "Sticky Notes", image: stickyImg },
  ];

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
          {TaskItems.map((item, index) => (
            <div key={index}>
              <MenuItem props={item} handleClick={handleClick}></MenuItem>
            </div>
          ))}
        </ul>
      </TaskTab>
      <div className={styles.tasksTitle}>Lists</div>
      <TaskTab>
        <ul className={styles.taskList}>
          {ListItems.map((item, index) => (
            <div key={index}>
              <MenuItem props={item} handleClick={handleClick}></MenuItem>
            </div>
          ))}
        </ul>
      </TaskTab>
      <div onClick={signOut} className={styles.logout}><img src={logout} alt="logout"/>Sign Out</div>
    </div>
  );
}

export default Menu;
