// src/components/reviews/ReviewForm.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createReview, updateReview } from '../../services/reviewService';
import { getAllSessions } from '../../services/sessionService';
import Button from '../common/Button';

export default function ReviewForm({ reviewToEdit, onReviewSaved }) {
  const { user } = useAuth();
  const [review, setReview] = useState({
    session: { sessionId: '' },
    reviewerUser: { userId: user?.userId || '' },
    rating: 1,
    comment: '',
  });
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getAllSessions();
        // Filter for completed sessions where the user is either the offeringUser or requestingUser
        const completedSessions = response.data.filter(
          (session) =>
            session.status === 'COMPLETED' &&
            (session.offeringUser?.userId === user.userId || session.requestingUser?.userId === user.userId)
        );
        setSessions(completedSessions);
      } catch (err) {
        setError('Failed to fetch sessions');
      }
    };
    fetchSessions();

    if (reviewToEdit) {
      setReview({
        session: { sessionId: reviewToEdit.session?.sessionId || '' },
        reviewerUser: { userId: reviewToEdit.reviewerUser?.userId || user.userId },
        rating: reviewToEdit.rating || 1,
        comment: reviewToEdit.comment || '',
      });
    }
  }, [reviewToEdit, user.userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sessionId') {
      setReview({ ...review, session: { sessionId: value } });
    } else {
      setReview({ ...review, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        sessionId: review.session.sessionId,
        reviewerUserId: review.reviewerUser.userId,
        rating: parseInt(review.rating),
        comment: review.comment,
      };
      if (reviewToEdit) {
        await updateReview(reviewToEdit.reviewId, payload);
      } else {
        await createReview(payload);
      }
      setError(null);
      if (onReviewSaved) onReviewSaved();
    } catch (err) {
      setError(err.response?.data || 'Failed to save review');
      console.error('Error response:', err.response?.data);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{reviewToEdit ? 'Edit Review' : 'Create Review'}</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div>
          <label className="block text-gray-700">Session</label>
          <select
            name="sessionId"
            value={review.session.sessionId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a completed session</option>
            {sessions.map((session) => (
              <option key={session.sessionId} value={session.sessionId}>
                {session.skill?.skillName} with {session.offeringUser?.username} on{' '}
                {new Date(session.sessionDateTime).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            value={review.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Comment</label>
          <textarea
            name="comment"
            value={review.comment}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
        <Button type="submit">{reviewToEdit ? 'Update' : 'Add'}</Button>
      </form>
    </div>
  );
}