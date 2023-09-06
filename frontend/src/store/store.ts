// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

// Define RootState type here
export type RootState = ReturnType<typeof store.getState>;
