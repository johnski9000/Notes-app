import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    userData: Cookies.get("userData")
      ? JSON.parse(Cookies.get("userData"))
      : {
          collections: {
            Lists: [],
            Notes: [],
            Tasks: [],
          },
          userData: {
            email: "",
          },
        },
    selectedElement: Cookies.get("selectedElement")
      ? JSON.parse(Cookies.get("selectedElement"))
      : "Tasks",
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
      console.log("payload", action.payload);
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
    addNote: (state, action) => {
      console.log(action.payload);
      state.userData.collections.Notes.push(action.payload);
      Cookies.set("userData", JSON.stringify(state.userData), { expires: 7 });
    },
    removeNote: (state, action) => {
      console.log(action.payload);
      const notesArray = state.userData.collections.Notes;
      const index = notesArray.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        notesArray.splice(index, 1);

        if (notesArray.length === 0) {
          state.userData.collections.Notes = [];
        }

        Cookies.set("userData", JSON.stringify(state.userData), { expires: 7 });
      }
    },
    setTaskComplete: (state, action) => {
      const taskArray = state.userData.collections.Tasks.slice(); // Create a shallow copy
      const index = taskArray.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        const updatedTask = {
          ...taskArray[index],
          completed: true,
        };

        taskArray[index] = updatedTask;

        // Create a new state object to ensure immutability
        const newState = {
          ...state,
          userData: {
            ...state.userData,
            collections: {
              ...state.userData.collections,
              Tasks: taskArray,
            },
          },
        };

        Cookies.set("userData", JSON.stringify(newState.userData), {
          expires: 7,
        });
        return newState;
      }

      return state; // Return the original state if the task is not found
    },
    addATask: (state, action) => {
      const taskArray = state.userData.collections.Tasks.slice(); // Create a shallow copy
      taskArray.push(action.payload);
      const newState = {
        ...state,
        userData: {
          ...state.userData,
          collections: {
            ...state.userData.collections,
            Tasks: taskArray,
          },
        },
      };
      Cookies.set("userData", JSON.stringify(newState.userData), {
        expires: 7,
      });
      return newState;
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
  addNote,
  removeNote,
  setTaskComplete,
  addATask,
} = userSlice.actions;

export default userSlice.reducer;
