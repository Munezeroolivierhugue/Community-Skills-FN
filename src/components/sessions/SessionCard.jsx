import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateSession } from '../../services/sessionService';
import Button from '../common/Button';

export default function SessionCard({ session, onEdit, onDelete, onRefresh }) {
  const { user } = useAuth();
  const [error, setError] = useState(null);

  const isRequestingUser = user && user.userId === session.requestingUser?.userId;
  const isOfferingUser = user && user.userId === session.offeringUser?.userId;

  const handleStatusUpdate = async (newStatus) => {
    const payload = { status: newStatus };
    console.log('Updating session status with payload:', payload);
    try {
      await updateSession(session.sessionId, payload);
      setError(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.response?.data || 'Failed to update session status');
      console.error('Error response:', err.response?.data);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <p className="text-gray-600">Offering User: {session.offeringUser?.username || 'N/A'}</p>
      <p className="text-gray-600">Requesting User: {session.requestingUser?.username || 'N/A'}</p>
      <p className="text-gray-600">Skill: {session.skill?.skillName || 'N/A'}</p>
      <p className="text-gray-600">Date: {new Date(session.sessionDateTime).toLocaleString()}</p>
      <p className="text-gray-600">Location: {session.location}</p>
      <p className="text-gray-600">Status: {session.status}</p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-2 space-x-2">
        {isRequestingUser && (
          <>
            <Button onClick={() => onEdit(session)} className="bg-yellow-500 hover:bg-yellow-600">
              Edit
            </Button>
            <Button onClick={() => onDelete(session.sessionId)} className="bg-red-500 hover:bg-red-600">
              Delete
            </Button>
            {session.status === 'CONFIRMED' && (
              <Button
                onClick={() => handleStatusUpdate('COMPLETED')}
                className="bg-green-500 hover:bg-green-600"
              >
                Mark as Completed
              </Button>
            )}
          </>
        )}
        {isOfferingUser && (
          <>
            {session.status === 'PENDING' && (
              <>
                <Button
                  onClick={() => handleStatusUpdate('CONFIRMED')}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => handleStatusUpdate('CANCELLED')}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Cancel
                </Button>
              </>
            )}
            {session.status === 'CONFIRMED' && (
              <Button
                onClick={() => handleStatusUpdate('COMPLETED')}
                className="bg-green-500 hover:bg-green-600"
              >
                Mark as Completed
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}