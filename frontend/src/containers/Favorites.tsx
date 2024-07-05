import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../components/atoms/Loading';
import PleaseLogin from '../components/atoms/PleaseLogin';
import MovieCard from '../components/atoms/MovieCard';

interface Movie {
  _id: string;
  name: string;
  imageUrl: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axiosInstance
        .get<Movie[]>('/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => setFavorites(response.data))
        .catch((error) => console.error(error));
    }
  }, [user]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <PleaseLogin />;
  }

  return (
    <div className="container mx-auto p-4">
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
