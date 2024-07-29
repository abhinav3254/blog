import { configureStore } from '@reduxjs/toolkit';
import AppSlice from './appSlice';

export const store = configureStore({
  reducer: {App:AppSlice},
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;