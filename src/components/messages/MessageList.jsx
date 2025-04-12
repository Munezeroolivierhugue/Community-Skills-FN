import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllMessages, deleteMessage } from '../../services/messageService';
import MessageCard from './MessageCard';

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const senderId = query.get('senderId');
  const receiverId = query.get('receiverId');

  const fetchMessages = async () => {
    try {
      const response = await getAllMessages();
      let filteredMessages = response.data;
      if (senderId) {
        filteredMessages = filteredMessages.filter(
          (message) => message.senderUser?.userId == senderId
        );
      }
      if (receiverId) {
        filteredMessages = filteredMessages.filter(
          (message) => message.receiverUser?.userId == receiverId
        );
      }
      setMessages(filteredMessages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages');
    }
  };

  const handleDelete = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(messageId);
        fetchMessages();
        setError(null);
      } catch (err) {
        setError('Failed to delete message');
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [senderId, receiverId]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Messages</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageCard
              key={message.messageId}
              message={message}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}