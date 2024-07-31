import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './combilne_reducers'; // Import your reducers here

const store = configureStore({
  reducer: rootReducer,
});

export default store;
