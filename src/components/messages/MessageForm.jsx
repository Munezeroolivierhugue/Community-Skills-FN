import { useState, useEffect } from 'react';
import { createMessage } from '../../services/messageService';
import { getAllUsers } from '../../services/userService';
import Button from '../common/Button';

export default function MessageForm({ onMessageSaved, defaultSenderId }) {
  const [message, setMessage] = useState({
    sender: { userId: defaultSenderId || '' },
    receiver: { userId: '' },
    content: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'receiverId') {
      setMessage({ ...message, receiver: { userId: value } });
    } else {
      setMessage({ ...message, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMessage({
        senderUser: { userId: message.sender.userId },
        receiverUser: { userId: message.receiver.userId },
        messageContent: message.content,
      });
      setMessage({ ...message, content: '', receiver: { userId: '' } });
      setError(null);
      if (onMessageSaved) onMessageSaved();
    } catch (err) {
      setError(err.response?.data || 'Failed to send message');
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Send Message</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div>
          <label className="block text-gray-700">Receiver</label>
          <select
            name="receiverId"
            value={message.receiver.userId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Message</label>
          <textarea
            name="content"
            value={message.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}