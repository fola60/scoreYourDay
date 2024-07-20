// taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readTasks } from './Crud.jsx';

// Define the async thunk
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (id, thunkAPI) => {
    try {
      const tasks = await readTasks(id);
      return tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define the slice
const taskSlice = createSlice({
  name: 'task',
  initialState: {
    value: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setTasksRedux: (state,action) => {
        state.value = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {setTasksRedux} = taskSlice.actions

export default taskSlice.reducer;
