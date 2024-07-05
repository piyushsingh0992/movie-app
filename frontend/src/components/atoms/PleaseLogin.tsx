import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLockClosed } from 'react-icons/hi';

const PleaseLogin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className=" p-8  text-center">
        <div className="flex flex-col items-center">
          <HiOutlineLockClosed className="text-blue-500 h-16 w-16 mb-4" />
          <h1 className="text-3xl font-semibold mb-4">Please login first</h1>
          <p className="text-gray-600 mb-6">
            You need to log in to access this page.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PleaseLogin;
