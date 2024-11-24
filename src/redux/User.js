import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem("currUser")!==null?JSON.parse(localStorage.getItem("currUser")):null
  },
  reducers: {
    setUser: (state, action) => {
        localStorage.setItem("currUser", JSON.stringify(action.payload));
        state.user = action.payload;
    },
    updateCurrUser: (state, action) => {
      const {key, value} = action.payload;
      const updatedUser = {...state.user, [key]:value};
      localStorage.setItem("currUser", JSON.stringify(updatedUser));
      state.user = updatedUser;
  }
  }
})

export const { setUser, updateCurrUser } = userSlice.actions
export default userSlice.reducer;