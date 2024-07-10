import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTodos, deleteTodo, fetchUsers } from './todoSlice'; 
import { EditIcon, DeleteIcon } from '../../assets/icons';
import { Button } from "../../components"; 

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos.list);
  const users = useSelector((store) => store.todos.users); 

  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos(selectedUserId));
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleFilterChange = (userId) => {
    setSelectedUserId(userId);
    dispatch(fetchTodos(userId)); 
  };

  const renderCard = () => todos.map((todo) => (
    <div
      className="bg-gray-200 p-5 flex flex-col justify-between shadow-xl ring-1 ring-gray-900/5"
      key={todo.id}
    >
      <div>
        <h3 className="font-bold text-lg text-gray-700">{todo.title}</h3>
        <span className="font-normal text-gray-600">{todo.details}</span>
      </div>

      <div className="flex gap-4 justify-end mt-1">
        <Link to={`edit-todo/${todo.id}`} className="flex">
          <button className="w-6 h-6">
            <EditIcon />
          </button>
        </Link>
        <button className="w-6 h-6" onClick={() => handleDeleteTodo(todo.id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <div className="flex flex-wrap flex-col xxs:flex-row justify-between text-center items-center mx-auto max-w-screen-xl mb-4">
        <h1 className="font-bold text-2xl text-gray-700">CRUD TodoList with Redux Toolkit</h1>
        <div className="relative">
          <label htmlFor="userFilter" className="block text-gray-700">Filter by User:</label>
          <select
            id="userFilter"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedUserId || ''}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>User {user.id}</option>
            ))}
          </select>
        </div>
        <Link to="/add-todo">
          <Button>Add Todo</Button>
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {todos.length ? renderCard() : <p className="text-center col-span-2 text-gray-700 font-semibold">No Todos</p>}
      </div>
    </>
  );
};

export default TodoList;
