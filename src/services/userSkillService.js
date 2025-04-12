import api from './api';

export const createUserSkill = (userSkill) => api.post('/user-skills', userSkill);
export const getAllUserSkills = () => api.get('/user-skills');
export const getUserSkillById = (userSkillId) => api.get(`/user-skills/${userSkillId}`);
export const updateUserSkill = (userSkillId, userSkill) => api.put(`/user-skills/${userSkillId}`, userSkill);
export const deleteUserSkill = (userSkillId) => api.delete(`/user-skills/${userSkillId}`);