import {createSlice} from '@reduxjs/toolkit';
import {
  createTask,
  deleteTask,
  getTask,
  Task,
  updateTask,
} from '../actions/task-action';

export interface TaskState {
  taskList: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  taskList: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTask.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        console.log(
          'call getTask Success :action.payload.data :: ',
          action.payload.data,
        );
        state.loading = false;
        state.taskList = action.payload.data;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTask.pending, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.taskList = action.payload.data;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
