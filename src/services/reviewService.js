import api from './api';

export const createReview = (review) => api.post('/reviews', review);
export const getAllReviews = () => api.get('/reviews');
export const getReviewById = (reviewId) => api.get(`/reviews/${reviewId}`);
export const updateReview = (reviewId, review) => api.put(`/reviews/${reviewId}`, review);
export const deleteReview = (reviewId) => api.delete(`/reviews/${reviewId}`);