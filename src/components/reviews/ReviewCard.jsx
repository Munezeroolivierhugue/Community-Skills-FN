// src/components/reviews/ReviewCard.jsx
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function ReviewCard({ review, onEdit, onDelete }) {
  const { user } = useAuth();
  const isReviewer = user && user.userId === review.reviewerUser?.userId;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <p className="text-gray-600">
        Session: {review.session?.skill?.skillName} with {review.session?.offeringUser?.username}
      </p>
      <p className="text-gray-600">Reviewer: {review.reviewerUser?.username}</p>
      <p className="text-gray-600">Rating: {review.rating}/5</p>
      <p className="text-gray-600">Comment: {review.comment || 'N/A'}</p>
      {isReviewer && (
        <div className="mt-2 space-x-2">
          <Button onClick={() => onEdit(review)} className="bg-yellow-500 hover:bg-yellow-600">
            Edit
          </Button>
          <Button onClick={() => onDelete(review.reviewId)} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}