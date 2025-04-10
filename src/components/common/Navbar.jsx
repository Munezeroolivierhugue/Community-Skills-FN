import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Community Skills</Link>
        </div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/categories" className="hover:underline">Categories</Link></li>
          <li><Link to="/skills" className="hover:underline">Skills</Link></li>
          <li><Link to="/users" className="hover:underline">Users</Link></li>
          {user ? (
            <>
              <li><Link to="/user-skills" className="hover:underline">My Skills</Link></li>
              <li><Link to="/sessions" className="hover:underline">Sessions</Link></li>
              <li><Link to="/messages" className="hover:underline">Messages</Link></li>
              <li><Link to="/reviews" className="hover:underline">Reviews</Link></li>
              <li>
                <span className="mr-2">Welcome, {user.username}</span>
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/register" className="hover:underline">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}