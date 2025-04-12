import api from './api';

export const createSession = (session) => api.post('/sessions', session);
export const getAllSessions = () => api.get('/sessions');
export const getSessionById = (sessionId) => api.get(`/sessions/${sessionId}`);
export const updateSession = (sessionId, session) => api.put(`/sessions/${sessionId}`, session);
export const deleteSession = (sessionId) => api.delete(`/sessions/${sessionId}`);