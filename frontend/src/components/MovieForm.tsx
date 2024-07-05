import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../contexts/AuthContext';

interface User {
  _id: string;
  username: string;
}

interface Comment {
  _id: string;
  text: string;
  user: User;
}

interface Movie {
  _id: string;
  name: string;
  description: string;
  runningTime: string;
  imageUrl: string;
  comments: Comment[];
}

interface MovieFormProps {
  onMovieAdded: (movie: Movie) => void;
  onClose: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ onMovieAdded, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [runningTime, setRunningTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const addMovie = () => {
    if (user && user.role === 'admin') {
      setLoading(true);
      setError(null);
      axiosInstance.post<Movie>('/api/movies', { name, description, runningTime, imageUrl }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          onMovieAdded(response.data);
          setName('');
          setDescription('');
          setRunningTime('');
          setImageUrl('');
          onClose();
        })
        .catch(error => {
          setError('Failed to add movie. Please try again.');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto  p-6 bg-white ">
      <h2 className="text-2xl font-semibold mb-4">Add a New Movie</h2>
      {error && (
        <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      <div >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"

            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="runningTime">
            Running Time
          </label>
          <input
            id="runningTime"
            type="text"
            placeholder="Running Time"
            value={runningTime}
            onChange={(e) => setRunningTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-8">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={addMovie}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Movie'}
        </button>
      </div>
    </div>
  );
};

export default MovieForm;
