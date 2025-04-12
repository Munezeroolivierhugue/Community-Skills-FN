// src/components/reviews/ReviewList.jsx
import { useState, useEffect, useRef } from 'react';
import { getAllReviews, deleteReview } from '../../services/reviewService';
import ReviewCard from './ReviewCard';

export default function ReviewList({ onEditReview, fetchReviews }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const fetchReviewsData = async () => {
    try {
      const response = await getAllReviews();
      setReviews(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch reviews');
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        fetchReviewsData();
        setError(null);
      } catch (err) {
        setError('Failed to delete review');
      }
    }
  };

  useEffect(() => {
    fetchReviewsData();
  }, []);

  useEffect(() => {
    if (fetchReviews) {
      fetchReviews.current = fetchReviewsData;
    }
  }, [fetchReviews]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Reviews</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.reviewId}
              review={review}
              onEdit={onEditReview}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}