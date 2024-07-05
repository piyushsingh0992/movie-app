import React from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface FavoriteButtonProps {
  movieId: string;
  isFavorite: boolean;
  onToggleFavorite: (isFavorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, isFavorite, onToggleFavorite }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toggleFavorite = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    axiosInstance.post(`/users/favorites/${movieId}`)
      .then(response => onToggleFavorite(response.data.favorite))
      .catch(error => console.error(error));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
    >
      {isFavorite ? 'Unmark Favorite' : 'Mark Favorite'}
    </button>
  );
};

export default FavoriteButton;
