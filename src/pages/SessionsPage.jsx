import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SessionForm from '../components/sessions/SessionForm';
import SessionList from '../components/sessions/SessionList';

export default function SessionsPage() {
  const { user } = useAuth();
  const [editingSession, setEditingSession] = useState(null);

  const handleSessionSaved = () => {
    setEditingSession(null);
    window.location.reload(); // Temporary; we'll improve this later
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Sessions</h2>
      {user && (
        <SessionForm
          sessionToEdit={editingSession}
          onSessionSaved={handleSessionSaved}
          defaultUserId={user.userId}
        />
      )}
      <SessionList onEditSession={setEditingSession} />
    </div>
  );
}