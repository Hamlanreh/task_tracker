import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    taskAdded: (state, action) => {
      const newTask = {
        ...action.payload,
        id: Math.trunc(Date.now() + Math.random()),
        date: Date.now(),
        resolved: 0,
      };
      state.tasks.push(newTask);
    },

    taskInProgress: (state, action) => {
      state.tasks = state.tasks.map(task => {
        const taskId = action.payload;
        if (task.id === taskId && task.resolved === 0) task.resolved++;
        return task;
      });
    },

    taskResolved: (state, action) => {
      state.tasks = state.tasks.map(task => {
        const taskId = action.payload;
        if (task.id === taskId && task.resolved === 1) task.resolved++;
        return task;
      });
    },

    taskRemoved: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    tasksCleared: state => {
      state.tasks = [];
    },

    tasksLoaded: state => {
      state.tasks = JSON.parse(localStorage.getItem('tasks'));
    },

    tasksStored: state => {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const {
  taskAdded,
  taskInProgress,
  taskResolved,
  taskRemoved,
  tasksCleared,
  tasksLoaded,
  tasksStored,
} = tasksSlice.actions;

export default tasksSlice.reducer;
