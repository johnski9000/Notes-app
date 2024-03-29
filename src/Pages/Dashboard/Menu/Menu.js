import React, { useState } from "react";
import styles from "../Dashboard.module.css";
import menu from "../media/menu.png";
import search from "../media/search.png";
import listImg from "../media/list.png";
import rightImg from "../media/right.png";
import calenderImg from "../media/calendar.png";
import stickyImg from "../media/sticky-note.png";
import { useSelector, useDispatch } from "react-redux";
import { setModal, setSelectedElement } from "../../../Redux/userSlice";
import MenuItem from "./MenuItem";
import { useAuth } from "../../../Context/AuthContext";
import logout from "../media/logout.png";
import add from "../media/add.png";
import submit from "../media/arrow-right.png";
import axios from "axios";
import { setUserData } from "../../../Redux/userSlice";
import { apiURLLocal } from "../../../Variables/const";
import clear from "../media/close.png";

function Menu() {
  const { signOut, currentUser } = useAuth();
  const { email } = currentUser ? currentUser._delegate : {};
  const [searchInput, setSearchInput] = useState();
  const [addList, setAddlist] = useState(true);
  const [list, setList] = useState({
    color: "black",
    title: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const userState = useSelector((state) => state);
  const collections = userState.userData.userData
    ? userState.userData.userData.collections
    : {};
  const Lists = collections ? collections.Lists : [];
  function handleChangeSearch(e) {
    setSearchInput(e.target.value);
  }

  const dispatch = useDispatch();

  function handleClick(data) {
    console.log(data);
    dispatch(setSelectedElement(data));
  }
  const TaskItems = [
    // { name: "Create a task", image: rightImg },
    { name: "Tasks", image: listImg },
    { name: "Calendar", image: calenderImg },
    { name: "Sticky Notes", image: stickyImg },
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
      .get(apiURLLocal, {
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

  if (menuOpen) {
    return (
      <div className={styles.MenuWrapper}>
        <div className={styles.titleSection}>
          <div className={styles.menuTitle}>Menu</div>
          <div
            className={styles.menuImage}
            onClick={() => setMenuOpen(!menuOpen)}
          >
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
              value={searchInput}
              onChange={(e) => handleChangeSearch(e)}
            />
          </div>
          {searchInput && (
            <img
              src={clear}
              alt="clear"
              className="absolute w-3 h-3 right-[10px] hover:cursor-pointer"
              onClick={() => setSearchInput("")}
            />
          )}
        </div>
        {searchInput ? (
          <div className="p-[17px] flex flex-col gap-[15px]">
            {searchItem().map((item, index) => (
              <div
                key={index}
                onClick={() => dispatch(setModal(item))}
                className="rounded-xl bg-[#e7e7e7] justify-center items-center p-[7px] shadow-xl hover:cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                {/* <span className="font-bold inline-flex justify-start items-start">
                Title -
              </span>
              &nbsp; */}
                {item.title}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className={styles.taskListContainer}>
              {/* <div className={styles.tasksTitle}>Tasks</div> */}
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
                      <input
                        type="color"
                        className="w-10"
                        value={list.color}
                        onChange={(e) =>
                          setList({ ...list, color: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        className={styles.addListTitle}
                        value={list.title}
                        placeholder="Insert Title"
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
  } else {
    return (
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute w-[50px] h-[50px] z-10 top-2 left-2 flex justify-center items-center bg-white rounded-full shadow-xl border-[1px] border-gray-300 hover:scale-110 transition-all cursor-pointer"
      >
        <img src={menu} alt="menu" className="w-6 h-6" />
      </div>
    );
  }
}

export default Menu;
