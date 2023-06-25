import { createSlice } from '@reduxjs/toolkit';

const getInitialTasks = () => {
  const localTaskList = window.localStorage.getItem('taskList');
  if (localTaskList) {
    return JSON.parse(localTaskList);
  }
  window.localStorage.setItem('taskList', []);
  return [];
};

const initialValue = {
  filterStatus: 'all',
  taskList: getInitialTasks(),
};

export const taskSlice = createSlice({
  name: 'Task',
  initialState: initialValue,
  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
      const taskList = window.localStorage.getItem('taskList');
      if (taskList) {
        const taskListArr = JSON.parse(taskList);
        taskListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('taskList', JSON.stringify(taskListArr));
      } else {
        window.localStorage.setItem(
          'taskList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    editTask: (state, action) => {
      const taskList = window.localStorage.getItem('taskList');
      if (taskList) {
        const taskListArr = JSON.parse(taskList);
        taskListArr.forEach((task) => {
          if (task.id === action.payload.id) {
            task.status = action.payload.status;
            task.title = action.payload.title;
          }
        });
        window.localStorage.setItem('taskList', JSON.stringify(taskListArr));
        state.taskList = [...taskListArr];
      }
    },
    deleteTask: (state, action) => {
      const taskList = window.localStorage.getItem('taskList');
      if (taskList) {
        const taskListArr = JSON.parse(taskList);
        taskListArr.forEach((task, index) => {
          if (task.id === action.payload) {
            taskListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('taskList', JSON.stringify(taskListArr));
        state.taskList = taskListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      const taskList = window.localStorage.getItem('taskList');
      state.taskList= JSON.parse(taskList);
      state.filterStatus = action.payload;
    },
    searchTaskByTitle: (state, action) => {
      const taskList = window.localStorage.getItem('taskList');
      state.taskList= JSON.parse(taskList);
      const searchedTaskText = action.payload.trim();
      state.taskList = state.taskList.filter((task) =>
        task.title.toLowerCase().includes(searchedTaskText.toLowerCase())
      );
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      const taskList = window.localStorage.getItem('taskList');
      state.taskList= JSON.parse(taskList);
      state.taskList.sort((a, b) => {
        if (state.sortOrder === 'asc') {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
    },
  },
});

export const { 
  addTask, 
  editTask, 
  deleteTask, 
  updateFilterStatus,
  searchTaskByTitle, 
  toggleSortOrder
} = taskSlice.actions;

export default taskSlice.reducer;
