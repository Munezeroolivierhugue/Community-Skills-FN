import api from './api';

export const createMessage = (message) => api.post('/messages', message);
export const getAllMessages = () => api.get('/messages');
export const getMessageById = (messageId) => api.get(`/messages/${messageId}`);
export const deleteMessage = (messageId) => api.delete(`/messages/${messageId}`);