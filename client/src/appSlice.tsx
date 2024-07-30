import { createSlice , PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  'searchValue' : "",
  'loggedIn':false
}

interface AppState {
  loggedIn: boolean;
  searchValue: string;
}

interface LoginPayload {
  username: string;
  password: string;
}


export const AppSlice = createSlice({
  // name: 'app',
  // initialState: initialState,
  // reducers: {
  //   filter:(state,action)=>{
  //     state.searchValue = action.payload},
  //   logout:(state)=>{
  //     state.loggedIn = false
  //   },
  //   login:(state)=>{
  //     state.loggedIn = true
  //   }

  // },
  name: 'app',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.loggedIn = true;
      // Add any additional login logic here
    },
    logout: (state) => {
      state.loggedIn = false;
    },
    filter: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { filter,login,logout } = AppSlice.actions

export default AppSlice.reducer