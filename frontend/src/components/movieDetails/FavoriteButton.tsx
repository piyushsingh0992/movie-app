import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface FavoriteButtonProps {
  movieId: string;
  isFavorite: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movieId,
  isFavorite,
}) => {
  const { user } = useAuth();
  const [markedFavorite, setMarkedFavorite] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleFavorite = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const url = `/api/users/favorites/${movieId}`;
    const method = markedFavorite ? 'delete' : 'post';

    axiosInstance({
      method: method,
      url: url,
    })
      .then((response) => setMarkedFavorite(!markedFavorite))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setMarkedFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <button
      onClick={toggleFavorite}
      className={`px-4 py-2 rounded-lg ${markedFavorite ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} transition duration-300 ease-in-out transform hover:scale-105`}
    >
      {markedFavorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
    </button>
  );
};

export default FavoriteButton;
