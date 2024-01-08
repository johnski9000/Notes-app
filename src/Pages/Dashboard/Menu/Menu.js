import React, { useState } from "react";
import styles from "../Dashboard.module.css";
import menu from "../media/menu.png";
import search from "../media/search.png";
import listImg from "../media/list.png";
import rightImg from "../media/right.png";
import calenderImg from "../media/calendar.png";
import stickyImg from "../media/sticky-note.png";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedElement } from "../../../Redux/userSlice";
import MenuItem from "./MenuItem";
import { useAuth } from "../../../Context/AuthContext";
import logout from "../media/logout.png";
import add from "../media/add.png";
import submit from "../media/arrow-right.png";
import axios from "axios";
import { setUserData } from "../../../Redux/userSlice";
import remove from "../media/x-button.png";

function Menu({ openModal }) {
  const { signOut, currentUser } = useAuth();
  const { email } = currentUser ? currentUser._delegate : {};
  const [searchInput, setSearchInput] = useState();
  const [addList, setAddlist] = useState(false);
  const [list, setList] = useState({
    color: "",
    title: "Insert Title",
  });
  const userState = useSelector((state) => state);
  console.log(userState.userData);

  const { collections } = userState.userData.userData;
  const { Lists } = collections;

  function handleChangeSearch(e) {
    setSearchInput(e.target.value);
  }

  const dispatch = useDispatch();

  function handleClick(data) {
    console.log(data);
    dispatch(setSelectedElement(data));
  }
  const TaskItems = [
    { name: "Home", image: rightImg },
    { name: "Tasks", image: listImg },
    { name: "Calendar", image: calenderImg },
    { name: "Sticky Notes", image: stickyImg },
  ];
  const ListColors = [
    "#ff0000", // Red
    "#00ff00", // Green
    "#0000ff", // Blue
    "#ffff00", // Yellow
    "#ff00ff", // Magenta
    "#00ffff", // Cyan
    "#ff8000", // Orange
    "#8000ff", // Purple
  ];

  function searchItem() {
    const flattenedArray = Object.values(collections).flatMap((array) => array);
    const lowerCaseQuery = searchInput.toLowerCase();

    const searchResults = flattenedArray.filter(
      (item) => item.title && item.title.toLowerCase().includes(lowerCaseQuery)
    );
    return searchResults;
  }
  function saveUserData() {
    axios
      .get("https://notes-server-lac.vercel.app/", {
        params: {
          email: email,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response);

        dispatch(setUserData(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  function submitList() {
    axios
      .put("http://localhost:8000/submitList", {
        params: {
          email: email,
          color: list.color,
          title: list.title,
        },
      })
      .then(function (response) {
        // handle success
        console.log(response);
        saveUserData();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
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
      {searchInput ? (
        <div className={styles.searchTab}>
          {searchItem().map((item, index) => (
            <div key={index} onClick={() => openModal(item)}>
              {item.title}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className={styles.taskListContainer}>
            <div className={styles.tasksTitle}>Tasks</div>
            <ul className={styles.taskList}>
              {TaskItems.map((item, index) => (
                <div key={index}>
                  <MenuItem
                    props={item}
                    state={userState}
                    handleClick={handleClick}
                  ></MenuItem>
                </div>
              ))}
            </ul>
          </div>
          <div className={styles.taskListContainer}>
            <div className={styles.tasksTitle}>Lists</div>
            <ul className={styles.taskList}>
              <div className={styles.listContainer} id="no-scrollbar">
                {Lists &&
                  Lists.map((item, index) => (
                    <div
                      key={index}
                      className={styles.listItem}
                      onClick={() => handleClick("List" + item.title)}
                    >
                      <div
                        className={styles.listItemColor}
                        style={{
                          backgroundColor: item.color,
                        }}
                      ></div>
                      <div className={styles.listItemTitle}>{item.title}</div>
                    </div>
                  ))}
              </div>

              <div
                className={styles.addListButton}
                onClick={() => setAddlist(!addList)}
              >
                <img src={add} alt="add list" />
                Add List
              </div>
              {addList && (
                <div className={styles.addListContainer}>
                  <div className={styles.addList}>
                    <div
                      style={{
                        backgroundColor: list.color,
                        minWidth: "20px",
                        height: "20px",
                      }}
                    />
                    <input type="color" />
                    <input
                      type="text"
                      className={styles.addListTitle}
                      value={list.title}
                      onChange={(e) =>
                        setList({ ...list, title: e.target.value })
                      }
                    />
                    <img
                      src={submit}
                      alt="submit list"
                      onClick={(e) => submitList(e)}
                    />
                  </div>
                  <div className={styles.colorContainer}>
                    {ListColors.map((item, index) => (
                      <div
                        onClick={() => setList({ ...list, color: item })}
                        key={index}
                        style={{
                          backgroundColor: item,
                          flex: "1",
                          height: "20px",
                          borderRadius: "4px",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
      <div onClick={signOut} className={styles.logout}>
        <img src={logout} alt="logout" />
        Sign Out
      </div>
    </div>
  );
}

export default Menu;
