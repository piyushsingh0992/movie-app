import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MovieCard from './MovieCard';
import PleaseLogin from './PleaseLogin';
import LoadingScreen from './Loading';

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
      axiosInstance.get<Movie[]>('/api/users/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => setFavorites(response.data))
      .catch(error => console.error(error));
    }
  }, [user]);

  if (loading) {
    return <LoadingScreen/>
  }

  if (!user) {
    return (
      <PleaseLogin/>

    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1>Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map(movie => (
      <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
