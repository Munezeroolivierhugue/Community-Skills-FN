import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function UserCard({ user: userData, onEdit, onDelete }) {
  const { user: authUser } = useAuth();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <Link to={`/user-skills?userId=${userData.userId}`} className="block">
        <h3 className="text-lg font-semibold">{userData.username}</h3>
        <p className="text-gray-600">{userData.firstName} {userData.lastName}</p>
      </Link>
      {authUser && authUser.userId === userData.userId && (
        <div className="mt-2 space-x-2">
          <Button onClick={() => onEdit(userData)} className="bg-yellow-500 hover:bg-yellow-600">
            Edit
          </Button>
          <Button onClick={() => onDelete(userData.userId)} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}