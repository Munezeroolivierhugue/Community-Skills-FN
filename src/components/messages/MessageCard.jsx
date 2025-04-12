import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function MessageCard({ message, onDelete }) {
  const { user } = useAuth();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <p className="text-gray-600">From: {message.senderUser?.username || 'N/A'}</p>
      <p className="text-gray-600">To: {message.receiverUser?.username || 'N/A'}</p>
      <p className="text-gray-600">Message: {message.messageContent}</p>
      <p className="text-gray-600">Sent: {new Date(message.timestamp).toLocaleString()}</p>
      {user && user.userId === message.senderUser?.userId && (
        <div className="mt-2">
          <Button onClick={() => onDelete(message.messageId)} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}