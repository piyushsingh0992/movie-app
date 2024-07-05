import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/" >
        <div className="text-white font-bold text-xl">MovieApp</div>
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/favorites" className="text-white hover:text-gray-300">
            Favorites
          </Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" className="text-white hover:text-gray-300">
              Admin
            </Link>
          )}
          {user ? (
            <button onClick={logout} className="text-white hover:text-gray-300">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
