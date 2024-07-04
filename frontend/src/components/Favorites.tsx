import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


interface Movie {
  _id: string;
  name: string;
  imageUrl: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { user } = useAuth();

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

  return (
    <div>
      <h1>Favorites</h1>
      <div className="movie-list">
        {favorites.map(movie => (
          <Link key={movie._id} to={`/movie/${movie._id}`}>
            <div className="movie-thumbnail">
              <img src={movie.imageUrl} alt={movie.name} />
              <p>{movie.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
