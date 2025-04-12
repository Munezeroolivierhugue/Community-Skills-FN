import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';
import UserForm from '../components/users/UserForm';

export default function RegisterPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    try {
      await createUser(userData);
      setError(null);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Failed to register');
    }
  };

  return (
    <div className="py-6">
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <UserForm isRegister onUserSaved={handleRegister} />
    </div>
  );
}