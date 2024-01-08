import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    userData: Cookies.get("userData")
      ? JSON.parse(Cookies.get("userData"))
      : null,
    selectedElement: Cookies.get("selectedElement")
      ? JSON.parse(Cookies.get("selectedElement"))
      : null,
    modal: Cookies.get("modal") ? JSON.parse(Cookies.get("modal")) : null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      let data = action.payload;
      Cookies.set("userData", JSON.stringify(data), { expires: 7 });
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
      Cookies.set("selectedElement", JSON.stringify(action.payload), {
        expires: 7,
      });
    },
    setModal: (state, action) => {
      state.modal = action.payload;
      Cookies.set("modal", JSON.stringify(action.payload), { expires: 7 });
    },
    clearModal: (state) => {
      state.modal = null;
      Cookies.remove("modal");
    },
    updateModal: (state, action) => {
      const { title, value } = action.payload;
      if (title === "due_date") {
        const jsDate = new Date(value);
        const seconds = Math.floor(jsDate.getTime() / 1000);
        const nanoseconds = (jsDate.getTime() % 1000) * 1e6;

        const firestoreTimestamp = {
          _seconds: seconds,
          _nanoseconds: nanoseconds,
        };
        state.modal = {
          ...state.modal,
          due_date: firestoreTimestamp,
        };
        console.log(state.modal.due_date);
        Cookies.set("modal", JSON.stringify(state.modal), { expires: 7 });
      } else if (title === "subTasks") {
        console.log(value);
        state.modal.subTasks.push(value);
        Cookies.set("modal", JSON.stringify(state.modal), { expires: 7 });
      } else {
        state.modal = { ...state.modal, [title]: value };
        Cookies.set("modal", JSON.stringify(state.modal), { expires: 7 });
      }
    },
    removeSubTask: (state, action) => {
      state.modal.subTasks.splice(action.payload, 1);
    },
  },
});

export const {
  setUserData,
  setSelectedElement,
  setModal,
  clearModal,
  updateModal,
  removeSubTask,
} = userSlice.actions;

export default userSlice.reducer;
