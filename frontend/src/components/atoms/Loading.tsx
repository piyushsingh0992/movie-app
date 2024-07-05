import React from 'react';
import { ImSpinner2 } from 'react-icons/im'; // You might need to install react-icons if you haven't already

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <ImSpinner2 className="animate-spin text-blue-500 h-16 w-16 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          Loading...
        </h1>
        <p className="text-gray-600">Please wait while we fetch the data.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
