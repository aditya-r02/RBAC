import { configureStore } from '@reduxjs/toolkit'
import userSlice from './User'
import userListSlice from './UserList'

export default configureStore({
  reducer: {
    user: userSlice,
    list: userListSlice
  }
})