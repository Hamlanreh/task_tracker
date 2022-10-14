import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const entities = combineReducers({
  tasks: tasksReducer,
});

export default entities;
