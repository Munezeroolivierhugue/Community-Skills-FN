import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../services/userService';
import UserCard from './UserCard';

export default function UserList({ onEditUser }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await deleteUser(userId);
        fetchUsers();
        setError(null);
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Users</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.userId}
              user={user}
              onEdit={onEditUser}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}