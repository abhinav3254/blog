import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  'searchValue' : "",
  'loggedIn':false,
  'userId':"",
  'token':''
}

interface AppState {
  loggedIn: boolean;
  searchValue: string;
}

interface LoginPayload {
  username: string;
  password: string;
  userId :any;
  token:any
}


export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.loggedIn = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.clear()
    },
    filter: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { filter,login,logout } = AppSlice.actions

export default AppSlice.reducer