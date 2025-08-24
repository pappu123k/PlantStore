import { configureStore } from '@reduxjs/toolkit';
import plantReducer from '../features/plantSlice';

export const store = configureStore({
  reducer: {
    plants: plantReducer,
  },
});
