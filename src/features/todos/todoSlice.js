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

export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async ({ id, title, details }) => {
    try {
      const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title,
        body: details
      });
      return response.data;
    } catch (error) {
      console.error('Error editing todo:', error);
      throw error;
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return id; 
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
);

export const fetchUsers = createAsyncThunk('todos/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
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
    builder.addCase(editTodo.fulfilled, (state, action) => {
      const editedTodo = action.payload;
      const existingTodo = state.list.find(todo => todo.id === editedTodo.id);
      if (existingTodo) {
        existingTodo.title = editedTodo.title;
        existingTodo.details = editedTodo.body; 
      }
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  }
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
