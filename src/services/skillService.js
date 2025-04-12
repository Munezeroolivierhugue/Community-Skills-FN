import api from './api';

export const createSkill = (skill) => api.post('/skills', skill);
export const getAllSkills = () => api.get('/skills');
export const getSkillById = (skillId) => api.get(`/skills/${skillId}`);
export const updateSkill = (skillId, skill) => api.put(`/skills/${skillId}`, skill);
export const deleteSkill = (skillId) => api.delete(`/skills/${skillId}`);