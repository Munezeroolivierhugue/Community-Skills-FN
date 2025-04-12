import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserById } from '../services/userService';
import UserForm from '../components/users/UserForm';
import UserList from '../components/users/UserList';

export default function UsersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editingUser, setEditingUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        try {
          const response = await getUserById(user.userId);
          setProfile(response.data);
          setEditingUser(response.data);
        } catch (err) {
          setError('Failed to fetch profile');
        }
      };
      fetchProfile();
    }
  }, [user, navigate]);

  const handleUserSaved = () => {
    setEditingUser(null);
    window.location.reload(); // Temporary; we'll improve this later
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {user && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {profile && (
            <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>First Name:</strong> {profile.firstName}</p>
              <p><strong>Last Name:</strong> {profile.lastName}</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
              {profile.profilePictureUrl && (
                <p><strong>Profile Picture URL:</strong> {profile.profilePictureUrl}</p>
              )}
            </div>
          )}
          <UserForm userToEdit={editingUser} onUserSaved={handleUserSaved} />
        </div>
      )}
      <UserList onEditUser={setEditingUser} />
    </div>
  );
}