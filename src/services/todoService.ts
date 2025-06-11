import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos';

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodo = async (todo: { title: string }) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id: string, updates: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
