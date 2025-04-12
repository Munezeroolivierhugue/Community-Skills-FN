import api from './api';

export const getAllCategories = () => api.get('/categories');
export const createCategory = (category) => api.post('/categories', category);
export const updateCategory = (categoryId, category) => api.put(`/categories/${categoryId}`, category);
export const deleteCategory = (categoryId) => api.delete(`/categories/${categoryId}`);