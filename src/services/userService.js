import api from './api';

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const createUser = (user) => api.post('/users', user);