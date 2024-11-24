import { createSlice } from '@reduxjs/toolkit'

const userListSlice = createSlice({
  name: 'list',
  initialState: {
    list: []
  },
  reducers: {
    setList: (state, action) => {
        state.list = action.payload;
    },
    addUser: (state, action) => {
        let updatedList = [...state.list, action.payload];
        console.log(updatedList);
        state.list = updatedList;
    },
    deleteUser: (state, action) => {
        let updatedList = state.list.filter(user=>user.email!==action.payload);
        state.list = updatedList;
    },
    updateUser: (state, action) => {
        let {email, key, value} = action.payload;
        let updatedList = state.list.map((user)=>{
            return (user.email===email)?{...user,[key]:value}:user;
        })
        state.list = updatedList;
    }
  }
})

export const { setList, addUser, deleteUser, updateUser } = userListSlice.actions
export default userListSlice.reducer;