import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllSessions, deleteSession } from '../../services/sessionService';
import SessionCard from './SessionCard';

export default function SessionList({ onEditSession, fetchSessions }) {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const userId = query.get('userId');
  const skillId = query.get('skillId');

  const fetchSessionsData = async () => {
    try {
      const response = await getAllSessions();
      let filteredSessions = response.data;
      if (userId) {
        filteredSessions = filteredSessions.filter(
          (session) => session.offeringUser?.userId == userId || session.requestingUser?.userId == userId
        );
      }
      if (skillId) {
        filteredSessions = filteredSessions.filter(
          (session) => session.skill?.skillId == skillId
        );
      }
      setSessions(filteredSessions);
      setError(null);
    } catch (err) {
      setError('Failed to fetch sessions');
    }
  };

  const handleDelete = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await deleteSession(sessionId);
        fetchSessionsData();
        setError(null);
      } catch (err) {
        setError('Failed to delete session');
      }
    }
  };

  useEffect(() => {
    fetchSessionsData();
  }, [userId, skillId]);

  useEffect(() => {
    if (fetchSessions) {
      fetchSessions.current = fetchSessionsData;
    }
  }, [fetchSessions]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Sessions</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sessions.map((session) => (
            <SessionCard
              key={session.sessionId}
              session={session}
              onEdit={onEditSession}
              onDelete={handleDelete}
              onRefresh={fetchSessionsData}
            />
          ))}
        </div>
      )}
    </div>
  );
}