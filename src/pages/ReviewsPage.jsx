// src/pages/ReviewsPage.jsx
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewList from '../components/reviews/ReviewList';

export default function ReviewsPage() {
  const { user } = useAuth();
  const [editingReview, setEditingReview] = useState(null);
  const fetchReviewsRef = useRef();

  const handleReviewSaved = () => {
    setEditingReview(null);
    if (fetchReviewsRef.current) {
      fetchReviewsRef.current();
    }
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {user && (
        <ReviewForm
          reviewToEdit={editingReview}
          onReviewSaved={handleReviewSaved}
        />
      )}
      <ReviewList onEditReview={setEditingReview} fetchReviews={fetchReviewsRef} />
    </div>
  );
}