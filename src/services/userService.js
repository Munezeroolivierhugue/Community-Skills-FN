import api from './api';

export const loginUser = (credentials) => api.post('/auth/login', credentials);