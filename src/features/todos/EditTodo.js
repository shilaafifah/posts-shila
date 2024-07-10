import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editTodo } from './todoSlice';
import { Button, TextField, FormContainer } from '../../components';

const EditTodo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const todos = useSelector(store => store.todos);
  const navigate = useNavigate();

  const existingTodo = todos.find(todo => todo.id === parseInt(params.id));

  const [values, setValues] = useState({
    title: existingTodo ? existingTodo.title : '',
    details: existingTodo ? existingTodo.details : ''
  });

  useEffect(() => {
    if (existingTodo) {
      setValues({
        title: existingTodo.title,
        details: existingTodo.details
      });
    }
  }, [existingTodo]);

  const handleEditTodo = () => {
    dispatch(editTodo({
      id: params.id,
      title: values.title,
      details: values.details
    }))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error editing todo:', error);
      });
  };

  return (
    <FormContainer title="Edit Todo">
      <TextField
        label="Todo"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Todo Item Title' }}
      />
      <TextField
        label="Details"
        value={values.details}
        onChange={(e) => setValues({ ...values, details: e.target.value })}
        inputProps={{ type: 'text', placeholder: 'Todo item details...' }}
      />
      <Button onClick={handleEditTodo}>Update</Button>
    </FormContainer>
  );
};

export default EditTodo;
