import axios from 'axios';
import { BASE_URL } from '../../../../config';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function register({ username, email, password }) {
  try {
    const response = await api.post('/api/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Registration failed';
    throw new Error(message);
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Login failed';
    throw new Error(message);
  }
}

export async function logout() {
  try {
    const response = await api.get('/api/auth/logout');
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Logout failed';
    throw new Error(message);
  }
}

export async function getme() {
  try {
    const response = await api.get('/api/auth/getme');
    return response.data;
  } catch (err) {
    return null;
  }
}

export default api;
