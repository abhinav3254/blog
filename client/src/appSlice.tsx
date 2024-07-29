import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  'searchValue' : "",
  'loggedIn':false
}
export const AppSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    filter:(state,action)=>{
      state.searchValue = action.payload},
    logout:(state)=>{
      state.loggedIn = false
    },
    login:(state)=>{
      state.loggedIn = true
    }

  },
})

// Action creators are generated for each case reducer function
export const { filter,login,logout } = AppSlice.actions

export default AppSlice.reducer