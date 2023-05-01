import { createSlice } from '@reduxjs/toolkit'
import Cookies from "js-cookie"

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: Cookies.get("userData") ? JSON.parse(Cookies.get('userData')) : null,
    selectedElement: Cookies.get("selectedElement") ? JSON.parse(Cookies.get('selectedElement')) : null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      let data = action.payload
      Cookies.set('userData', JSON.stringify(data), { expires: 7 })
    },
    setSelectedElement: (state, action) => {
        state.selectedElement = action.payload
        Cookies.set('selectedElement', JSON.stringify(action.payload), { expires: 7 })
    }
  }
})

export const { setUserData, setSelectedElement } = userSlice.actions;

export default userSlice.reducer;

