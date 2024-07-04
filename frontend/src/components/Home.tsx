import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

interface Movie {
  _id: string;
  name: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axiosInstance.get<Movie[]>('/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div className="movie-list">
        {movies.map(movie => (
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

export default Home;
