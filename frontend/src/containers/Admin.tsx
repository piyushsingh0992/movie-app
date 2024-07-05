// Admin.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/atoms/Modal';
import MovieForm from '../components/admin/MovieForm';
import MovieList from '../components/admin/MovieList';

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

const Admin: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    axiosInstance
      .get<Movie[]>('/api/movies')
      .then((response) => setMovies(response.data))
      .catch((error) => setError('Failed to fetch movies'))
      .finally(() => setLoading(false));
  }, []);

  const handleMovieAdded = (newMovie: Movie) => {
    setMovies([...movies, newMovie]);
  };

  const handleCommentDeleted = (movieId: string, commentId: string) => {
    setMovies(
      movies.map((movie) => {
        if (movie._id === movieId) {
          return {
            ...movie,
            comments: movie.comments.filter(
              (comment) => comment._id !== commentId
            ),
          };
        }
        return movie;
      })
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Admin</h1>
      <button
        onClick={openModal}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add New Movie
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <MovieForm onMovieAdded={handleMovieAdded} onClose={closeModal} />
      </Modal>
      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <MovieList movies={movies} onCommentDeleted={handleCommentDeleted} />
      )}
    </div>
  );
};

export default Admin;
