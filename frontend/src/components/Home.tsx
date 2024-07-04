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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map(movie => (
          <Link key={movie._id} to={`/movie/${movie._id}`}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={movie.imageUrl} alt={movie.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{movie.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
