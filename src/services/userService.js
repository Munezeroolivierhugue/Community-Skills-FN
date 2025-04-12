import api from './api';

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const createUser = (user) => api.post('/users', user);
export const getAllUsers = () => api.get('/users');
export const getUserById = (userId) => api.get(`/users/${userId}`);
export const updateUser = (userId, user) => api.put(`/users/${userId}`, user);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);