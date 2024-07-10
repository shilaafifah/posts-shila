import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (userId = null) => {
  let url = 'https://jsonplaceholder.typicode.com/posts';
  if (userId) {
    url += `?userId=${userId}`;
  }
  const response = await axios.get(url);
  return response.data.map(post => ({
    id: post.id,
    title: post.title,
    details: post.body,
    userId: post.userId
  }));
});


const initialState = {
  list: [],
  users: []
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
