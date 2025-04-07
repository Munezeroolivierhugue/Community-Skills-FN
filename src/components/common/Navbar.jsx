import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/categories" className="hover:underline">Categories</Link></li>
            <li><Link to="/users" className="hover:underline">Users</Link></li>
            <li><Link to="/skills" className="hover:underline">Skills</Link></li>
            <li><Link to="/user-skills" className="hover:underline">User Skills</Link></li>
            <li><Link to="/sessions" className="hover:underline">Sessions</Link></li>
            <li><Link to="/messages" className="hover:underline">Messages</Link></li>
            <li><Link to="/reviews" className="hover:underline">Reviews</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </nav>
      );
}

export default Navbar;
