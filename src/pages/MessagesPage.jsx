import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MessageForm from '../components/messages/MessageForm';
import MessageList from '../components/messages/MessageList';

export default function MessagesPage() {
  const { user } = useAuth();

  const handleMessageSaved = () => {
    window.location.reload(); // Temporary; we'll improve this later
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      {user && (
        <MessageForm
          onMessageSaved={handleMessageSaved}
          defaultSenderId={user.userId}
        />
      )}
      <MessageList />
    </div>
  );
}