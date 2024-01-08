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
      state.modal = { ...state.modal, ...action.payload };
      Cookies.set("modal", JSON.stringify(state.modal), { expires: 7 });
    },
  },
});

export const {
  setUserData,
  setSelectedElement,
  setModal,
  clearModal,
  updateModal,
} = userSlice.actions;

export default userSlice.reducer;
